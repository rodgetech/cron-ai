import type { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI } from "langchain/chat_models";
import {
  SystemMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { backOff } from "exponential-backoff";

type Body = {
  prompt: string;
};

const chat = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as Body;

  try {
    const response = await backOff(() => generateCron(data.prompt));
    return res.status(200).json({ result: response, error: null });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Failed to generate cron", result: null });
  }
}

async function generateCron(prompt: string) {
  const cronPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `
      Below is text describing a cron expression.
      Your goal is to:
      - Convert the text to a valid cron expression.
      - The cron expression you generate must match this regular expression: "^((\*|[0-9]|[1-5][0-9]|60) |(\*|[0-9]|[1-5][0-9]|60) |(\*|[0-9]|[1-2][0-9]|3[0-1]) |(\*|[0-9]|[1-9]|[1-2][0-9]|3[0-1]|4[0-6]|5[0-3]) |(\*|[0-9]|[1-9]|1[0-2]))(\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+)$"
      - Return only the generated cron expression and nothing else.

      Here are some examples:
      - Text: A cron that runs every hour
      - Cron: 0 * * * *
      - Text: A cron that runs ever 12 hour
      - Cron: 0 */12 * * *

      Below is the text:
      TEXT: A cron that runs {text}

      YOUR RESPONSE:
      `
    ),
  ]);

  const response = await chat.generatePrompt([
    await cronPrompt.formatPromptValue({
      text: prompt,
    }),
  ]);

  return response.generations[0][0].text;
}

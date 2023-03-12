import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "../../utils/openai";

type Body = {
  prompt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as Body;

  const prompt = generatePrompt(data);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: [":"],
  });

  res.status(200).json({ result: response.data.choices[0].text });
}

function generatePrompt(data: Body) {
  const prompt = `
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
    TEXT: A cron that runs ${data.prompt}
    YOUR RESPONSE:
  `;
  return prompt;
}

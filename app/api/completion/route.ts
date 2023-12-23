import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse  } from "ai";



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0,
    stream: true,
    messages: [{role: "system", content: `Below is text describing a cron expression.
    Your goal is to:
    - Convert the text to a valid cron expression.
    - The cron expression you generate must match this regular expression: "^((\*|[0-9]|[1-5][0-9]|60) |(\*|[0-9]|[1-5][0-9]|60) |(\*|[0-9]|[1-2][0-9]|3[0-1]) |(\*|[0-9]|[1-9]|[1-2][0-9]|3[0-1]|4[0-6]|5[0-3]) |(\*|[0-9]|[1-9]|1[0-2]))(\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+)$"
    - Return only the generated cron expression and nothing else.
    Here are some examples:
    - Text: A cron that runs every hour
    - Cron: 0 * * * *
    - Text: A cron that runs ever 12 hour
    - Cron: 0 */12 * * *`}, {role: "user", content: prompt}]
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

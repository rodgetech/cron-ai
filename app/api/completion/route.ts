import OpenAI from 'openai';

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

// Function to validate if the prompt is related to cron expressions using GPT
async function validateWithGPT(prompt: string): Promise<{ isValid: boolean; reason: string }> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a validator that determines if a user's prompt is related to generating cron expressions or scheduling tasks.
          
          Return a JSON object with two fields:
          1. "isValid": boolean - true if the prompt is asking about creating a cron expression or scheduling, false otherwise. It should also be
          false if the prompt is asking to generate an invalid cron expression.
          2. "reason": string - a brief explanation of your decision
          
          Examples of valid prompts:
          - "I need a cron job that runs every day at midnight"
          - "every 15 minutes"
          - "Every year"
          
          Examples of invalid prompts:
          - "What's the weather like today?"
          - "Write me a poem about cats"
          - "How do I make chocolate chip cookies?"
          `
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return { isValid: false, reason: "Failed to validate the prompt" };
    }

    try {
      // Parse the JSON response
      const validation = JSON.parse(content);
      return {
        isValid: validation.isValid,
        reason: validation.reason
      };
    } catch (error) {
      console.error("Error parsing validation response:", error);
      // If parsing fails, default to allowing the prompt
      return { isValid: true, reason: "Validation parsing failed, allowing by default" };
    }
  } catch (error) {
    console.error("Error validating with GPT:", error);
    // If validation fails, default to allowing the prompt
    return { isValid: true, reason: "Validation failed, allowing by default" };
  }
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    // Validate that the prompt is provided
    if (!prompt || typeof prompt !== 'string') {
      return Response.json({ error: "Prompt is required and must be a string" }, { status: 400 });
    }
    
    // Validate that the prompt is related to cron expressions using GPT
    const validation = await validateWithGPT(prompt);
    if (!validation.isValid) {
      return Response.json({ 
        error: "Your prompt doesn't seem to be about scheduling or cron expressions. " + validation.reason
      }, { status: 400 });
    }

    // Request the OpenAI API for the response without streaming
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [
        {
          role: "system", 
          content: `Below is text describing a cron expression.
          Your goal is to:
          - Convert the text to a valid cron expression.
          - The cron expression you generate must match this regular expression: "^((\*|[0-9]|[1-5][0-9]|60) |(\*|[0-9]|[1-5][0-9]|60) |(\*|[0-9]|[1-2][0-9]|3[0-1]) |(\*|[0-9]|[1-9]|[1-2][0-9]|3[0-1]|4[0-6]|5[0-3]) |(\*|[0-9]|[1-9]|1[0-2]))(\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+) (\*|\/[0-9]|[0-9\-,\/]+)$"
          - Return only the generated cron expression and nothing else.
          Here are some examples:
          - Text: A cron that runs every hour
          - Cron: 0 * * * *
          - Text: A cron that runs ever 12 hour
          - Cron: 0 */12 * * *`
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
    });

    // Validate the response
    const content = response.choices[0]?.message?.content?.trim();
    if (!content) {
      return Response.json({ error: "Failed to generate a cron expression" }, { status: 500 });
    }

    // Return just the content as a regular JSON response
    return Response.json({ 
      completion: content
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json({ 
      error: "An error occurred while processing your request" 
    }, { status: 500 });
  }
}

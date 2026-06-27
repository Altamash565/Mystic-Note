// import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";

// export const runtime = "edge";

export async function POST(req: Request) {
  console.log("GOOGLE_GENERATIVE_AI_API_KEY inside Next.js:", process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "Present (length: " + process.env.GOOGLE_GENERATIVE_AI_API_KEY.length + ")" : "Not Present");
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've always wanted to try?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    /* Commented out OpenAI API code:
    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      prompt,
    });
    */

    // Google Gemini API integration
    const result = await streamText({
      model: google("gemini-3.5-flash"),
      prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Gemini Error:", error.message);
    } else {
      console.error("Unknown Error:", error);
    }
    return NextResponse.json(
      { success: false, message: "Gemini API Error" },
      { status: 500 }
    );
  }
}

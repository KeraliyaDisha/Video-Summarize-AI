import { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/getUserMeLoader";
import { getAuthToken } from "@/data/services/getToken";
import { extractYouTubeID } from "@/lib/utils";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const TEMPLATE = `
INSTRUCTIONS: 
  For the this {text}, complete the following steps.
  Generate the title for based on the content provided
  Summarize the following content and include 5 key topics, writing in first person using normal tone of voice.
  Also Write a Title
  Write a youtube video description
    - Include heading and sections.  
    - Incorporate keywords and key takeaways
    - **Also include details about the video such as video length, upload date, and any available metadata.**

  Generate bulleted list of key points and benefits

  Return possible and best recommended key words
`;

async function generateSummary(content: string, template: string) {
  const prompt = PromptTemplate.fromTemplate(template);

  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_AI_STUDIO_KEY,
    modelName: process.env.GOOGLE_AI_MODEL ?? "gemini-2.0-flash",
    temperature: process.env.GOOGLE_AI_TEMPERATURE
      ? parseFloat(process.env.GOOGLE_AI_TEMPERATURE)
      : 0.7,
    maxOutputTokens: process.env.GOOGLE_AI_MAX_TOKENS
      ? parseInt(process.env.GOOGLE_AI_MAX_TOKENS)
      : 4000,
  });

  const outputParser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);

  try {
    const summary = await chain.invoke({ text: content });
    return summary;
  } catch (error) {
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }));
    return new Response(
      JSON.stringify({ error: "Failed to generate summary." })
    );
  }
}
export async function POST(req: NextRequest) {
  const user = await getUserMeLoader();
  const token = await getAuthToken();

  if (!user.ok || !token) {
    return new Response(
      JSON.stringify({ data: null, error: "Not authenticated" }),
      { status: 401 }
    );
  }

  if (user.data.credits < 1) {
    return new Response(
      JSON.stringify({
        data: null,
        error: "Insufficient credits",
      }),
      { status: 402 }
    );
  }

  const body = await req.json();
  const fullUrl = body.videoId;
  const extractedId = extractYouTubeID(fullUrl);
  console.log("Extracted ID:", extractedId);
  const url = `https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/${extractedId}`;

  let transcriptData;

  try {
    const transcript = await fetch(url);
    transcriptData = await transcript.text();
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }));
    return new Response(JSON.stringify({ error: "Unknown error" }));
  }

  let summary: Awaited<ReturnType<typeof generateSummary>>;

  try {
    summary = await generateSummary(transcriptData, TEMPLATE);
    console.log("summery:", summary);
    return new Response(JSON.stringify({ data: summary, error: null }));
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }));
    return new Response(JSON.stringify({ error: "Error generating summary." }));
  }
}

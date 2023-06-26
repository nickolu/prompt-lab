import type { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI } from "langchain/chat_models/openai";
import llMChat from "@/utils/llmChat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const chat = new ChatOpenAI({
    temperature: 0.7,
    modelName: process.env.CHARACTER_CONVERSATION_GPT_MODEL,
  });
  const { messages, modelName, temperature } = req?.body?.params;

  if (!messages || !modelName || !temperature) {
    return res.status(400).json({ error: "Missing params" });
  }

  try {
    const response = await llMChat({ messages, modelName, temperature });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(JSON.stringify(error));
  }
}

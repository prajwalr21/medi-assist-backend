import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import { API_KEY } from "../env";
import { Request, Response } from "express"
import { getPrompt } from "../prompts";

interface Message {
    type: 'assistant' | 'system' | 'user',
    content: string
  }

const MODEL_NAME = "models/chat-bison-001";

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

export const getAnswerHandler = async (req: Request, res: Response) => {
    try {
        const messages = req.body.messages as Message[]
        const operationType = req.body['operation-type']
        const prompt = getPrompt(operationType)
        const result = await client.generateMessage({
          model: MODEL_NAME,
          temperature: 0,
          candidateCount: 1,
          prompt: {
            context: prompt,
            messages,
          },
        });
        if (result[0].candidates) {
            return res.status(200).json({
                type: 'assistant',
                content: result[0].candidates[0].content
            })
        }
    } catch(e) {
        res.status(200).json({
            type: 'assistant',
            content: 'Sorry for the inconvenience, something went wrong'
        })
    }
}
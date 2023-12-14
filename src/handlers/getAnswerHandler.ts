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
  authClient: new GoogleAuth().fromAPIKey(API_KEY ?? ''),
});

export const getAnswerHandler = async (req: Request, res: Response) => {
    try {
        console.log('Inside get answer handler')
        const messages = req.body.messages as Message[]
        const operationType = req.body['operation-type']
        console.log('Operation type: ' + operationType)
        const prompt = getPrompt(operationType)
        console.log(prompt)
        const result = await client.generateMessage({
          model: MODEL_NAME, // Required. The model to use to generate the result.
          temperature: 0, // Optional. Value `0.0` always uses the highest-probability result.
          candidateCount: 1, // Optional. The number of candidate results to generate.
          prompt: {
            context: prompt,
            messages,
          },
        });
        console.log(result[0])
        if (result[0].candidates) {
            return res.status(200).json({
                type: 'assistant',
                content: result[0].candidates[0].content
            })
        }
    } catch(e) {
        console.log(e)
        res.status(200).json({
            type: 'assistant',
            content: 'Sorry for the inconvenience, something went wrong'
        })
    }
}
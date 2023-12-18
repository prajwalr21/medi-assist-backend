import { NextFunction, Request, Response } from "express";
import { getPrompt } from "../prompts";
import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import { API_KEY } from "../env";

export const classifier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const context = JSON.stringify(req.body.messages)  
        const input = `${getPrompt('classifier')}\nJSON:${context}`
        
        const MODEL_NAME = "models/text-bison-001";
    
        const client = new TextServiceClient({
            authClient: new GoogleAuth().fromAPIKey(API_KEY),
        });
        const response = await client.generateText({
            model: MODEL_NAME,
            prompt: {
                text: input
            }
        })
        if (response[0].candidates) {
            const classification = response[0].candidates[0].output.toLowerCase().includes('serious') ? 'serious' : 'normal'
            if (classification === 'normal') {
                next()
            } else {
                res.status(200).json({
                    type:'assistant',
                    content: '*SERIOUS*'
                })
            }
        }
    } catch (e) {
        res.json({
            type: 'assistant',
            content: 'Sorry for the inconvenience, something went wrong'
        })
    }
    // This function is used to classify the request as severe or mild
}
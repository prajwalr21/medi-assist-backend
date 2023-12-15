import { NextFunction, Request, Response } from "express";
import { getPrompt } from "../prompts";
import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import { API_KEY } from "../env";

export const classifier = async (req: Request, res: Response, next: NextFunction) => {
    // This function is used to classify the request as severe or mild
    const context = JSON.stringify(req.body.messages)  
    const input = `${getPrompt('classifier')}\nJSON:${context}`
    
    const MODEL_NAME = "models/text-bison-001";

    const client = new TextServiceClient({
        authClient: new GoogleAuth().fromAPIKey('AIzaSyA07JBqiSY2njMG23G63bClU5GN6TQDR0Y'),
    });
    const response = await client.generateText({
        model: MODEL_NAME,
        prompt: {
            text: input
        }
    })
    console.log(response[0])
    if (response[0].candidates) {
        console.log('CLASSIFIER - ', response[0].candidates[0].output)
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
}
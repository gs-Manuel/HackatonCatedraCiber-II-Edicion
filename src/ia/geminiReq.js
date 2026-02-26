import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function geminiReq(query, context = "") {
    const payload = {
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
            responseMimeType: "text/plain",
            temperature: 0.3
        }
    };

    if (context && context.trim() !== "") {
        payload.config.systemInstruction = context;
    }

    const response = await ai.models.generateContent(payload);
    return response.text;
}

export default geminiReq;
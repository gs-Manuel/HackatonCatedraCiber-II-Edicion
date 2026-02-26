import { GoogleGenAI } from "@google/genai";



async function geminiReq(query, context = "") {
    const ai = new GoogleGenAI({});
    //Hay que guardar la ApiKey en una varuiable de entorno llamada GEMINI_API_KEY
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
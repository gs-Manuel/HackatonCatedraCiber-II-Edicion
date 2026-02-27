import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/generate-report", async (req, res) => {
  try {
    const { query, context } = req.body;

    if (!query) {
      return res.status(400).json({ error: "query es requerido" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "GEMINI_API_KEY no está configurada" });
    }

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
    const reportText = response.text;

    res.json({ success: true, report: reportText });
  } catch (error) {
    console.error("Error en /api/generate-report:", error);
    res
      .status(500)
      .json({ success: false, error: error.message || "Error desconocido" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", server: "running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Gemini running on http://localhost:${PORT}`);
  console.log(`📍 Endpoint: POST http://localhost:${PORT}/api/generate-report`);
});

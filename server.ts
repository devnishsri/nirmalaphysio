import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client on the server
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== "undefined" && apiKey !== "null" && apiKey.trim() !== "") {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("Warning: GEMINI_API_KEY environment variable is not set. AI Drafting will fallback to local template-based drafting.");
  }

  // API endpoint: Draft a WhatsApp inquiry using Gemini
  app.post("/api/draft", async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const {
        name,
        age,
        phone,
        painArea,
        duration,
        description,
        consultationType,
        preferredTime,
      } = req.body;

      if (!name || !painArea) {
        res.status(400).json({ error: "Missing required fields: name and painArea are mandatory." });
        return;
      }

      // Reusable clinical template generator
      const generateLocalDraft = () => {
        return `Respected Dr. Ritesh Agrahari (PT),

I would like to request an appointment/home visit at your clinic. Here are my details:

👤 Patient Name: ${name}
🎂 Age: ${age || "Not specified"}
📞 Contact: ${phone || "Not specified"}
🩺 Primary Concern: ${painArea}
⏳ Duration of Symptoms: ${duration || "Not specified"}
📝 Description of Pain: ${description || "None"}
📍 Appointment Type: ${consultationType === "home" ? "🏠 Home Visit Required" : "🏥 Clinic Visit"}
📅 Preferred Time: ${preferredTime || "Flexible"}

Please let me know your availability.

Sincerely,
${name}`;
      };

      // If AI client is not available, use a high-quality local fallback template
      if (!ai) {
        res.json({ draft: generateLocalDraft(), mode: "fallback" });
        return;
      }

      try {
        const systemPrompt = `You are an expert clinical receptionist and administrative assistant for a high-end physical therapy and ortho-neuro rehabilitation clinic. Your job is to format raw user symptoms and appointment details into a highly professional, polite, and beautifully structured WhatsApp message directed to Dr. Ritesh Agrahari (PT).`;

        const userPrompt = `Draft a professional WhatsApp message for Dr. Ritesh Agrahari (PT), BPT, MSMF Saifai PGI, Consultant Physiotherapist. Use professional formatting with clean emojis (like 📅, 👤, 🩺, 📍, 🏠, 🏥) to structure the information, making it extremely readable and respectful.

Patient details to compile:
- Patient Name: ${name}
- Age: ${age || "Not provided"}
- Contact Number: ${phone || "Not provided"}
- Primary Rehab/Pain Area: ${painArea}
- Symptom Duration: ${duration || "Not provided"}
- Description of Symptoms: ${description || "No additional comments"}
- Preferred Consultation: ${consultationType === "home" ? "🏠 Home Visit" : "🏥 Clinic Appointment"}
- Preferred Day & Time: ${preferredTime || "Flexible / Doctor's convenience"}

Guidelines:
1. Start directly with: "Respected Dr. Ritesh Agrahari (PT),"
2. State politely that the patient wants to schedule a consultation or home visit.
3. Structure the clinical data in an elegant, easy-to-read list with proper spacing.
4. Keep the tone clinical, empathetic, and respectful.
5. End with a polite closing, followed by "Sincerely, [Patient Name]".
6. Do NOT write any meta-conversational text, introductions, or codeblocks. Output ONLY the raw text to be sent via WhatsApp.`;

        // Call Gemini 3.5 Flash server-side
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });

        const draftText = response.text || "";

        if (!draftText.trim()) {
          throw new Error("Received empty response from Gemini API.");
        }

        res.json({
          draft: draftText.trim(),
          mode: "ai",
        });
      } catch (geminiError: any) {
        console.error("Gemini service failed, falling back to template:", geminiError);
        res.json({
          draft: generateLocalDraft(),
          mode: "fallback",
          warning: "AI generation is currently unavailable. Using standard clinical template.",
        });
      }
    } catch (error: any) {
      console.error("General drafting error:", error);
      res.status(500).json({
        error: "Failed to process drafting request.",
        details: error.message || error,
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Serve static client assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

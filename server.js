import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Only allow your website to call this API
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'https://your-domain.com'] 
}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are Shivam Kumar's Assistant. Shivam is a Java Full Stack Developer based in Hyderabad. Highlight his skills in Spring Boot, React, Next.js, and Firebase professionally. Keep answers concise and helpful."
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import { genkit, z } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';
import { onCall } from 'firebase-functions/v2/https';

const ai = genkit({
  plugins: [googleAI({ apiKey: 'YOUR_GOOGLE_AI_API_KEY' })],
  model: gemini15Flash,
});

// This is the "Brain" of your chatbot
export const portfolioChat = onCall(async (request) => {
  const userMessage = request.data.text;

  const response = await ai.generate({
    system: `You are Shivam Kumar's Personal AI Assistant. 
    Use this info to answer:
    - Role: Advanced Java Full Stack Developer.
    - Skills: Spring Boot, React, PostgreSQL, AWS, Docker.
    - Projects: AI Jobs Finder, Food Order App, E-Commerce Platform.
    - Personality: Professional, helpful, and witty.
    If asked about things not related to Shivam, politely steer the conversation back to his work.`,
    prompt: userMessage,
  });

  return { text: response.text };
});

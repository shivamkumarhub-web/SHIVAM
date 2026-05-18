import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';
import { onCall } from 'firebase-functions/v2/https';

const ai = genkit({
  // No hardcoded key here; we will set it via Firebase Secrets
  plugins: [googleAI()], 
  model: gemini15Flash,
});

export const portfolioChat = onCall({ secrets: ["GOOGLE_GENAI_API_KEY"] }, async (request) => {
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

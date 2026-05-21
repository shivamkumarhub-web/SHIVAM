import { GoogleGenerativeAI } from "@google/generative-ai";

// Use the Gemini API Key you restricted to your GitHub URL
const genAI = new GoogleGenerativeAI("AIzaSyA9nDkn14FbemujZI_6VXIJnG_ok_SxJY0");

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "You are an AI assistant for Shivam's portfolio. Be professional and highlight his skills in React and Firebase.",
});

export const askAI = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting to Shivam's brain right now. Try again!";
  }
};

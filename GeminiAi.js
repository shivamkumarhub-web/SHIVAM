// 1. Add this to your existing imports
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-functions.js";

// 2. Initialize Functions
const functions = getFunctions(app);
const portfolioChat = httpsCallable(functions, 'portfolioChat'); // This matches the "Flow" name from Genkit

// 3. UI Logic for the Chatbox
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

chatToggle.onclick = () => chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
closeChat.onclick = () => chatWindow.style.display = 'none';

async function handleSendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Add User Message to UI
  appendMessage('user', text);
  userInput.value = '';

  try {
    // Call the Genkit AI Flow
    const result = await portfolioChat({ data: text });
    appendMessage('ai', result.data);
  } catch (error) {
    console.error("AI Error:", error);
    appendMessage('ai', "Sorry, I'm having trouble connecting right now.");
  }
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.style.padding = '10px';
  msg.style.borderRadius = '10px';
  msg.style.maxWidth = '80%';
  msg.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
  msg.style.background = sender === 'user' ? '#667eea' : '#e9ecef';
  msg.style.color = sender === 'user' ? 'white' : '#333';
  msg.innerText = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.onclick = handleSendMessage;
userInput.onkeypress = (e) => { if(e.key === 'Enter') handleSendMessage(); };

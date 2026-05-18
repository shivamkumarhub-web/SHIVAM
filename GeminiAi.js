import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-functions.js";

// Use your existing config from the HTML
const firebaseConfig = {
  apiKey: "AIzaSyB49vgbQRfmg6XCj_A_ocyC7Vd9J_fgWbQ",
  authDomain: "shivamportfolio-7c458.firebaseapp.com",
  projectId: "shivamportfolio-7c458",
  storageBucket: "shivamportfolio-7c458.firebasestorage.app",
  messagingSenderId: "166581393688",
  appId: "1:166581393688:web:7fb06e67d3640f120d666d"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const portfolioChat = httpsCallable(functions, 'portfolioChat');

// UI Selectors
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

chatToggle.onclick = () => chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
closeChat.onclick = () => chatWindow.style.display = 'none';

async function handleChat() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMsg('user', text);
  userInput.value = '';

  try {
    const result = await portfolioChat({ text: text });
    appendMsg('ai', result.data.text);
  } catch (error) {
    console.error("AI Error:", error);
    appendMsg('ai', "I'm having trouble connecting to my brain. Please try again later.");
  }
}

function appendMsg(sender, text) {
  const div = document.createElement('div');
  div.innerText = text;
  div.style.padding = '10px';
  div.style.borderRadius = '10px';
  div.style.marginBottom = '8px';
  div.style.maxWidth = '85%';
  div.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
  div.style.background = sender === 'user' ? '#667eea' : '#e9ecef';
  div.style.color = sender === 'user' ? 'white' : '#333';
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.onclick = handleChat;
userInput.onkeypress = (e) => { if(e.key === 'Enter') handleChat(); };

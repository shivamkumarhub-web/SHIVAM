import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your verified configuration from the Firebase screenshot
const firebaseConfig = {
  apiKey: "AIzaSyB49vgbQRfmg6XCj_A_ocyC7Vd9J_fgWbQ",
  authDomain: "shivamportfolio-7c458.firebaseapp.com",
  projectId: "shivamportfolio-7c458",
  storageBucket: "shivamportfolio-7c458.firebasestorage.app",
  messagingSenderId: "166581393688",
  appId: "1:166581393688:web:7fb06e67d3640f120d666d",
  measurementId: "G-79JLH2NZBL"
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// --- 1. Google Sign-In ---
const googleBtn = document.getElementById('googleBtn');
googleBtn.addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        alert(`Welcome ${result.user.displayName}!`);
    } catch (error) {
        console.error("Auth Error:", error);
    }
});

// --- 2. Save Message to Firestore ---
const contactForm = document.getElementById('portfolioContact');
const statusDiv = document.getElementById('status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    
    btn.innerText = "Sending...";
    btn.disabled = true;

    const name = document.getElementById('contactName').value;
    const message = document.getElementById('contactMessage').value;

    try {
        // This pushes data to your 'messages' collection
        await addDoc(collection(db, "messages"), {
            sender: name,
            text: message,
            timestamp: serverTimestamp()
        });

        statusDiv.innerText = "✓ Success! Message sent.";
        statusDiv.style.color = "green";
        contactForm.reset();
    } catch (err) {
        console.error("Firestore Error:", err);
        statusDiv.innerText = "Error: Check your Security Rules.";
        statusDiv.style.color = "red";
    } finally {
        btn.innerText = "Send to Firestore";
        btn.disabled = false;
    }
});

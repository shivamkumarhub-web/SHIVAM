import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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
const logoutBtn = document.getElementById('logoutBtn');
const userStatus = document.getElementById('userStatus');
const welcomeGreeting = document.getElementById('welcomeGreeting');

if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome ${result.user.displayName}!`);
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Sign-in failed. Check console for details.");
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  });
}

// Auto-update UI + auto-fill form when logged in
onAuthStateChanged(auth, (user) => {
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');

  if (user) {
    if (welcomeGreeting) welcomeGreeting.innerText = `Welcome back, ${user.displayName}!`;
    if (userStatus) userStatus.innerText = `Connected: ${user.email}`;
    if (googleBtn) googleBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'flex';

    // Auto-fill contact form if user is signed in
    if (nameInput && !nameInput.value) nameInput.value = user.displayName || '';
    if (emailInput && !emailInput.value) emailInput.value = user.email || '';
  } else {
    if (welcomeGreeting) welcomeGreeting.innerText = "Welcome to My Portfolio";
    if (userStatus) userStatus.innerText = "";
    if (googleBtn) googleBtn.style.display = 'flex';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
});

// --- 2. Save Message to Firestore ---
const contactForm = document.getElementById('portfolioContact');
const statusDiv = document.getElementById('status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    
    btn.innerText = "Sending...";
    btn.disabled = true;
    statusDiv.innerText = "";

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      statusDiv.innerText = "Please fill in all fields.";
      statusDiv.style.color = "red";
      btn.innerText = "Send to Firestore";
      btn.disabled = false;
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      statusDiv.innerText = "Please enter a valid email address.";
      statusDiv.style.color = "red";
      btn.innerText = "Send to Firestore";
      btn.disabled = false;
      return;
    }

    try {
      // This pushes data to your 'messages' collection
      await addDoc(collection(db, "messages"), {
        sender: name,
        email: email,
        text: message,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent // optional: track device
      });

      statusDiv.innerText = "✓ Success! Message sent. I'll reply soon.";
      statusDiv.style.color = "green";
      contactForm.reset();
    } catch (err) {
      console.error("Firestore Error:", err);
      statusDiv.innerText = "Error: Check your Security Rules or try again.";
      statusDiv.style.color = "red";
    } finally {
      btn.innerText = "Send to Firestore";
      btn.disabled = false;
    }
  });
}

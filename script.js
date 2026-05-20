import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB49vgbQRfmg6XCj_A_ocyC7Vd9J_fgWbQ",
  authDomain: "shivamportfolio-7c458.firebaseapp.com",
  projectId: "shivamportfolio-7c458",
  storageBucket: "shivamportfolio-7c458.firebasestorage.app",
  messagingSenderId: "166581393688",
  appId: "1:166581393688:web:7fb06e67d3640f120d666d",
  measurementId: "G-79JLH2NZBL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // This allows other files to use the DB

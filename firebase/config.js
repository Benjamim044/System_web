import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdXxMGysbJatH0nqL09cYBH7d2rqzylNY",
  authDomain: "system-web-24.firebaseapp.com",
  projectId: "system-web-24",
  storageBucket: "system-web-24.firebasestorage.app",
  messagingSenderId: "433443326570",
  appId: "1:433443326570:web:c399201075be4a9ea25813",
  measurementId: "G-CXC2SWXB9S",
};

// 🔥 EXPORTANDO O APP (ESSENCIAL)
export const app = initializeApp(firebaseConfig);

// 🔥 FIRESTORE
export const db = getFirestore(app);

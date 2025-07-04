// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7--P_cxdHyV36502BONHG9FFF5XwKQ9A",
  authDomain: "report-1a0d0.firebaseapp.com",
  projectId: "report-1a0d0",
  storageBucket: "report-1a0d0.firebasestorage.app",
  messagingSenderId: "536149246533",
  appId: "1:536149246533:web:9ebf98948acfc4eec5592c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 
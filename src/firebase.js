// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbNZX7MWInhfSyCGK427ftxTBX7CEIeR8",
  authDomain: "patna-library.firebaseapp.com",
  projectId: "patna-library",
  storageBucket: "patna-library.firebasestorage.app",
  messagingSenderId: "613155834355",
  appId: "1:613155834355:web:6746738e632c3339b86a86",
  measurementId: "G-VGV4592DDJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 
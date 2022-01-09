// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyARXB7_r8gRAjLLBKXZ7-4rcwvY6qjXFJA",
  authDomain: "romus-app.firebaseapp.com",
  projectId: "romus-app",
  storageBucket: "romus-app.appspot.com",
  messagingSenderId: "53015669641",
  appId: "1:53015669641:web:6749ab225d0ba9b17c8f58",
  measurementId: "G-6EXGP1Y599"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
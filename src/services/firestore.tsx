import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqzqTjjM1Uk27c-86rDINy4cNPtBJrR6U",
  authDomain: "hibernation-46481.firebaseapp.com",
  projectId: "hibernation-46481",
  storageBucket: "hibernation-46481.appspot.com",
  messagingSenderId: "997285783346",
  appId: "1:997285783346:web:56de7ea316f5ecd4c6d92b",
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);

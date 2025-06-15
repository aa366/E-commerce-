
import { initializeApp } from "firebase/app";

import{getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0F8tk8QquYD2Ge7ljKjLFkiw6DOxcfqw",
  authDomain: "e-commerce-001-8e40f.firebaseapp.com",
  projectId: "e-commerce-001-8e40f",
  storageBucket: "e-commerce-001-8e40f.firebasestorage.app",
  messagingSenderId: "20624260727",
  appId: "1:20624260727:web:fa349c921be5a8a14c9072",
  measurementId: "G-4B052B1NM2"
};

// Initialize Firebase
export const  app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm_5ZejDJ0TQQaA4VkdyeLViExeZxSTvY",
  authDomain: "chat-app-5ab37.firebaseapp.com",
  projectId: "chat-app-5ab37",
  storageBucket: "chat-app-5ab37.firebasestorage.app",
  messagingSenderId: "995020765026",
  appId: "1:995020765026:web:5fdcb51a104b6183ef5e3b",
  measurementId: "G-4GSW4H3K5V"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "m19y-mern-estate.firebaseapp.com",
  projectId: "m19y-mern-estate",
  storageBucket: "m19y-mern-estate.appspot.com",
  messagingSenderId: "246621935643",
  appId: "1:246621935643:web:363f08b625adf81d8380be",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

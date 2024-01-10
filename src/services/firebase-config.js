// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB336K4ZdU3rFjNBIJIxnYPQbugmvvNgPA",
  authDomain: "expense-tracker-5fe32.firebaseapp.com",
  projectId: "expense-tracker-5fe32",
  storageBucket: "expense-tracker-5fe32.appspot.com",
  messagingSenderId: "873136141507",
  appId: "1:873136141507:web:6c57446fa9c9d03fd01e76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
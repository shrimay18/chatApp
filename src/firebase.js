import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAxfgeVdWxsLFOtpzoF6C1sZ57PeQhrhXU",
  authDomain: "chat-app-final-bb5d2.firebaseapp.com",
  projectId: "chat-app-final-bb5d2",
  storageBucket: "chat-app-final-bb5d2.appspot.com",
  messagingSenderId: "534778919439",
  appId: "1:534778919439:web:a54f1ce9217a29d0b4c17a",
  measurementId: "G-DBW0Y1KR7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
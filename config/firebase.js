import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCfyxgtHeA_QXAeKWGnEz6FQxGwmjCnpcw",
  authDomain: "chat-app-92132.firebaseapp.com",
  projectId: "chat-app-92132",
  storageBucket: "chat-app-92132.appspot.com",
  messagingSenderId: "774716760018",
  appId: "1:774716760018:web:2e860e0b2dff7e393b320b",
  measurementId: "G-Z1CB98DY1L"
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
console.log(auth);
export const database = getFirestore();

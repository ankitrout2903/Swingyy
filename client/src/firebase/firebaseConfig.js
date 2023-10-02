// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOqtrfYucQaxz-HznHdBGNPnUNwnzgC2w",
  authDomain: "chat-app-1bf83.firebaseapp.com",
  projectId: "chat-app-1bf83",
  storageBucket: "chat-app-1bf83.appspot.com",
  messagingSenderId: "1002936329052",
  appId: "1:1002936329052:web:7995ef61d8832ce96f5799"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export  {auth};
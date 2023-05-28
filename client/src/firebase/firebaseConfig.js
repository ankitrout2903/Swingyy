// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPsjHxrIPviSUccwIBG3g84m2EeyGM-6E",
  authDomain: "swingyy-c0af7.firebaseapp.com",
  projectId: "swingyy-c0af7",
  storageBucket: "swingyy-c0af7.appspot.com",
  messagingSenderId: "328921116870",
  appId: "1:328921116870:web:b3a53094ecec8429f8e7c7",
  measurementId: "G-R999PRQC3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {app, analytics, auth};



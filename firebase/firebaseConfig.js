// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvl2QbkoqaY6tyL1cCYS1SAmWajCs6lYI",
  authDomain: "gbc-cross-final-video.firebaseapp.com",
  projectId: "gbc-cross-final-video",
  storageBucket: "gbc-cross-final-video.appspot.com",
  messagingSenderId: "443767030898",
  appId: "1:443767030898:web:9e8c154a27079f7310aeeb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
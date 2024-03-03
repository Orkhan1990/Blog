// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "orkhan-s-blog-e75b1.firebaseapp.com",
  projectId: "orkhan-s-blog-e75b1",
  storageBucket: "orkhan-s-blog-e75b1.appspot.com",
  messagingSenderId: "583248417900",
  appId: "1:583248417900:web:1f1f46a386c8ee2bc57449"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
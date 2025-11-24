// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "pitamber-web-blog.firebaseapp.com",
  projectId: "pitamber-web-blog",
  storageBucket: "pitamber-web-blog.firebasestorage.app",
  messagingSenderId: "1006174194624",
  appId: "1:1006174194624:web:d8a00581ef1d6f2ac01625"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {auth,provider};
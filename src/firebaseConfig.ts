// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO98mpSVpmp0HZdaXzH2lm6z841HBL8iI",
  authDomain: "day1-54f15.firebaseapp.com",
  projectId: "day1-54f15",
  storageBucket: "day1-54f15.appspot.com",
  messagingSenderId: "9188090012",
  appId: "1:9188090012:web:5350d5de1c679db6198d59",
  measurementId: "G-BJ9DT7C5YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services you need
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
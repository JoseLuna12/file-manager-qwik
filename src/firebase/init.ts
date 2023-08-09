// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyxOM6Q1twBAL_P_1-LPkqrxjDAU5ux7Y",
  authDomain: "dashboard-blogs-app.firebaseapp.com",
  projectId: "dashboard-blogs-app",
  storageBucket: "dashboard-blogs-app.appspot.com",
  messagingSenderId: "353540482030",
  appId: "1:353540482030:web:bf15d28b423c85de49e4ff",
  measurementId: "G-6M0CPW9ENB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADissmObYb094wrgdmBlIPB7qvsEyaffI",
  authDomain: "cutecore-health.firebaseapp.com",
  projectId: "cutecore-health",
  storageBucket: "cutecore-health.appspot.com",
  messagingSenderId: "27316861719",
  appId: "1:27316861719:web:75a33b2ce6a8d1292b9552",
  measurementId: "G-6YX4X9VMDE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };

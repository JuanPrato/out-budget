import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXtKvp-_QJa9crBuLbfa85-Cx3CM26MC0",
  authDomain: "our-budget-42b45.firebaseapp.com",
  projectId: "our-budget-42b45",
  storageBucket: "our-budget-42b45.appspot.com",
  messagingSenderId: "130177419419",
  appId: "1:130177419419:web:57efb90ae4966cee089e3e",
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default app;


// Ensure you have initialized Firebase in your project and set up Firestore.

import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGEMk2ysUax0r9AN07qvPIT5DuO81bap8",
  authDomain: "database-81995.firebaseapp.com",
  projectId: "database-81995",
  storageBucket: "database-81995.firebasestorage.app",
  messagingSenderId: "140248265002",
  appId: "1:140248265002:web:c4833ea0679d2152666e53",
  measurementId: "G-QWR32V5F2P"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);

export { db };

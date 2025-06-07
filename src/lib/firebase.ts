
// Ensure you have initialized Firebase in your project and set up Firestore.

import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByhVfI0_PWMygt5y1j8LBMY7aVE6JvIjg",
  authDomain: "noodle-hub.firebaseapp.com",
  projectId: "noodle-hub",
  storageBucket: "noodle-hub.firebasestorage.app",
  messagingSenderId: "230957040823",
  appId: "1:230957040823:web:4ecbc107c4711525c37932"
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

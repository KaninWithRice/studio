
// TODO: Replace with your actual Firebase project configuration
// Ensure you have initialized Firebase in your project and set up Firestore.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your API key
  authDomain: "YOUR_AUTH_DOMAIN", // Replace with your auth domain
  projectId: "YOUR_PROJECT_ID", // Replace with your project ID
  storageBucket: "YOUR_STORAGE_BUCKET", // Replace with your storage bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your messaging sender ID
  appId: "YOUR_APP_ID", // Replace with your app ID
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

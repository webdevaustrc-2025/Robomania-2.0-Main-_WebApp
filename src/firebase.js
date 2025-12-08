import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAr1nZVPZX_EJFD_m__MQ_OQyl1JW1APdQ",
  authDomain: "robomania-main-app.firebaseapp.com",
  projectId: "robomania-main-app",
  storageBucket: "robomania-main-app.firebasestorage.app",
  messagingSenderId: "419732256688",
  appId: "1:419732256688:web:7c3be0d0165409b8c04875",
  measurementId: "G-EBZJMGEQ5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;

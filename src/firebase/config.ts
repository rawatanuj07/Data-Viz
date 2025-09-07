import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Debug: Log environment variables
console.log('Environment variables:', {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? 'Set' : 'Missing',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ? 'Set' : 'Missing',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ? 'Set' : 'Missing',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ? 'Set' : 'Missing',
  appId: process.env.REACT_APP_FIREBASE_APP_ID ? 'Set' : 'Missing',
});

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCnV5xK41fF0yvul1Fo9Nv_sRRm90GHYVE",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "react-firebase-f7389.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "react-firebase-f7389",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "react-firebase-f7389.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "415296234023",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:415296234023:web:d663a638a251f48db6e402",
};

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  throw new Error('Firebase configuration is incomplete. Please check your .env file.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Debug: Log auth instance
console.log('Firebase Auth initialized:', auth);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export default app;


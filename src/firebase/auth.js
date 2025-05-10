import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase-config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// User Registration
export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// User Login
export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// User Logout
export const logoutUser = () => {
    return signOut(auth);
};
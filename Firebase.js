import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCdJXwDLwneSJQuDLpRT9l2OiAm7TJC61E",
    authDomain: "smit-projects-59cf9.firebaseapp.com",
    projectId: "smit-projects-59cf9",
    storageBucket: "smit-projects-59cf9.firebasestorage.app",
    messagingSenderId: "585656771043",
    appId: "1:585656771043:web:7f917579468224872500d6"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    db,
    doc,
    setDoc
}
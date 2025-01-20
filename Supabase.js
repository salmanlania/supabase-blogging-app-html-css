// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// import { getFirestore, doc, setDoc, collection, addDoc, getDocs , getDoc, updateDoc , deleteDoc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyCdJXwDLwneSJQuDLpRT9l2OiAm7TJC61E",
//     authDomain: "smit-projects-59cf9.firebaseapp.com",
//     projectId: "smit-projects-59cf9",
//     storageBucket: "smit-projects-59cf9.firebasestorage.app",
//     messagingSenderId: "585656771043",
//     appId: "1:585656771043:web:7f917579468224872500d6"
// };
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore(app);

// export {
//     app,
//     auth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     db,
//     doc,
//     setDoc,
//     collection,
//     addDoc,
//     getDocs,
//     getDoc,
//     updateDoc,
//     deleteDoc
// }

// import { createClient } from '@supabase/supabase-js'
const { createClient } = supabase;

const supabaseUrl = 'https://voeeetuomtolemoykfnz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvZWVldHVvbXRvbGVtb3lrZm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzU3NTgsImV4cCI6MjA1MTgxMTc1OH0.368to-uZu7FxSLxlgwyQ0IbTMPdt4vpXVfu8G3Whvt8'

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(supabaseUrl, supabaseKey)
// console.log('Supabase Client:', supabaseClient);

export {
    supabaseClient
}
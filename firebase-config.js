// firebase-config.js
import { getStorage } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js"; 
// Replace with your own config
const firebaseConfig = {
    apiKey: "AIzaSyCNICRxGwTzDOwnYlpw1_CfzwMBdQ7Hvkk",
    authDomain: "piercing-b9a07.firebaseapp.com",
    projectId: "piercing-b9a07",
    storageBucket: "piercing-b9a07.firebasestorage.app",
    messagingSenderId: "158023000213",
    appId: "1:158023000213:web:c62baf9aa1bfc886de7b9c",
    measurementId: "G-N0LGRLJ43S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

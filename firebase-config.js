// firebase-config.js
import{getStorage as e}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";import{initializeApp as s}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";import{getFirestore as t}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";import{getAuth as a}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// Replace with your own config
const r={t:"AIzaSyCNICRxGwTzDOwnYlpw1_CfzwMBdQ7Hvkk",i:"piercing-b9a07.firebaseapp.com",o:"piercing-b9a07",p:"piercing-b9a07.firebasestorage.app",m:"158023000213",g:"1:158023000213:web:c62baf9aa1bfc886de7b9c",j:"G-N0LGRLJ43S"};
// Initialize Firebase
const i=s(r);export const db=t(i);export const storage=e(i);export const auth=a(i);

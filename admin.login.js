import{db as e}from'./firebase-config.js';import{collection as o,getDocs as s,updateDoc as t,doc as n,query as c,orderBy as i,getDoc as r}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";import{getAuth as a,signInWithEmailAndPassword as m}from'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js';const d=a();const w=document.getElementById("login-form");const f=document.querySelector(".email");const g=document.querySelector(".password");const p=document.getElementById("message");const u=document.getElementById("toggle-password");w.addEventListener("submit",function(o){o.preventDefault();
// Get email and password
const s=f.value.trim().toLowerCase();const t=g.value;
// Authenticate using Firebase Authentication
m(d,s,t).then(o=>{
// Successfully logged in
const t=o.user;console.log("User logged in:",t);
// Retrieve the admin code from Firestore after successful login
const s=n(e,"adminAccess",t.uid);r(s).then(o=>{if(o.exists()){const s=o.data().code;sessionStorage.setItem("adminCode",s);window.location.href="admin.html"}else{console.log("No admin document found",t.uid);l("Unauthorized access!")}})})["catch"](o=>{console.error("Error logging in:",o);l("Incorrect email or password!")})});function l(o){p.textContent=o;p.classList.add("show");setTimeout(()=>{p.classList.remove("show")},3e3)}
// Toggle show/hide password
u.addEventListener("click",()=>{const o=g.getAttribute("type")==="password"?"text":"password";g.setAttribute("type",o);u.textContent=o==="password"?"Show Password":"Hide Password"});

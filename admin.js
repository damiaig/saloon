import{db as u,storage as c,auth as t}from"./firebase-config.js";import{getStorage as L,ref as l,uploadBytes as d,getDownloadURL as r,deleteObject as M}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";import{onAuthStateChanged as n}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";import{getFirestore as E,collection as p,addDoc as m,query as i,getDoc as O,orderBy as f,setDoc as H,getDocs as g,deleteDoc as b,doc as w}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";n(t,async t=>{if(!t){
// Redirect unauthenticated users
sessionStorage.clear();window.location.href="admin.login.html";return}
// If user is logged in, check admin validation
const n=sessionStorage.getItem("adminCode");if(!n){sessionStorage.clear();window.location.href="admin.login.html";return}const s=w(u,"adminAccess",t.uid);const e=await O(s);
// If user is not an admin or the code doesn't match, log them out
if(!e.exists()||e.data().code!==n){sessionStorage.clear();window.location.href="admin.login.html";return}
// Admin validated, now load messages
});n(t,async t=>{if(!t){console.log("User is not authenticated.");sessionStorage.clear();window.location.href="admin.login.html";return}console.log("User is authenticated:",t);
// Continue with admin validation...
});const v=document.getElementById("photoInput");const Z=document.getElementById("uploadBtn");const y=document.getElementById("uploadStatus");const s=document.querySelector(".image-slider-frame");let e=0;let o=[];let $=[];let h=[];Z.addEventListener("click",async()=>{const t=v.files[0];if(!t)return;const n=Date.now();const s=`bookings/images/${n}_${t.name}`;const e=l(c,s);try{const o=await d(e,t);const i=await r(o.ref);await m(p(u,"Bookings"),{t:i,timestamp:n,o:s});y.textContent="Upload successful!";y.style.color="green";k(true)}catch(a){y.textContent="Upload failed.";y.style.color="red"}});
// Image Preview
v.addEventListener("change",()=>{const n=v.files[0];if(!n)return;const t=new FileReader;t.onload=t=>{o.unshift(t.target.result);h.unshift({file:n,url:t.target.result});D();N()};t.readAsDataURL(n)});
// Save Button
// Save Button
// Save Button
const a=document.createElement("button");a.textContent="Save";a.className="custom-save-btn";// Use class for styling
// Append save button inside the .btn div
document.querySelector(".btn").appendChild(a);a.addEventListener("click",async()=>{
// 👉 Show the loader
document.querySelector(".loader-overlay").style.display="flex";for(let t=0;t<h.length;t++){const{file:n}=h[t];const s=Date.now();const e=`bookings/images/${s}_${n.name}`;const a=l(c,e);const o=await d(a,n);const i=await r(o.ref);await m(p(u,"Bookings"),{t:i,timestamp:s,o:e})}h=[];await k(true);N();
// ✅ Optional slight delay before reloading to show completed state
setTimeout(()=>{location.reload()},500);// Can adjust or remove
});
// Fetch and render images
async function k(t=false){const n=i(p(u,"Bookings"),f("timestamp","desc"));const s=await g(n);o=h.map(t=>t.url);$=[];for(const e of s.docs){const a=e.data();o.push(a.t);$.push({id:e.id,url:a.t,o:a.o})}D();N();if(t){setTimeout(()=>{document.querySelector(".slider-image")?.scrollIntoView({behavior:"smooth"})},300)}}
// Render slider
function D(){s.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" class="arrow left" height="34px" viewBox="0 -960 960 960" width="34px" fill="#980c0c">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
      </svg>
      <img src="${o[e]}" alt="Slider Image" class="slider-image" />
      <svg xmlns="http://www.w3.org/2000/svg" class="arrow right" height="34px" viewBox="0 -960 960 960" width="34px" fill="#980c0c">
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
      </svg>
   
    `;const t=s.querySelector(".slider-image");const n=document.querySelector(".cha");n.innerHTML=`
    <div class="slider-dots">
      ${o.slice(0,8).map((t,n)=>`
        <span class="dot ${n===e?'active':''}" data-index="${n}"></span>
      `).join('')}
     </div>
  `;
// Trigger fade-in with a small delay
setTimeout(()=>{t.classList.add("active")},50);// Short delay to ensure opacity transition
s.querySelector(".left").onclick=()=>{e=(e-1+o.length)%o.length;D()};s.querySelector(".right").onclick=()=>{e=(e+1)%o.length;D()};document.querySelectorAll(".dot").forEach(t=>{t.onclick=()=>{e=parseInt(t.dataset.index);D()}})}
// Auto-slide
setInterval(()=>{if(o.length>1){e=(e+1)%o.length;D()}},5e3);
// Render delete list
function N(){const e=document.querySelector(".delete");if(!e)return;e.innerHTML="";o.forEach((t,n)=>{const s=document.createElement("li");s.innerHTML=`
      Image ${n+1} <span style="color:red; cursor:pointer;" data-index="${n}">&times;</span>
    `;e.appendChild(s)});document.querySelectorAll(".delete span").forEach(t=>{t.addEventListener("click",async t=>{const n=parseInt(t.target.dataset.index);const s=h.find(t=>t.url===o[n]);if(s){h=h.filter(t=>t.url!==s.url)}else{const e=$.find(t=>t.url===o[n]);if(e){await b(w(u,"Bookings",e.id));await M(l(c,e.o))}}o.splice(n,1);D();N()})})}
// Initial load
k();document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.piercing-button').forEach(s=>{s.addEventListener('click',t=>{const n=s.closest('.customer').querySelector('.piercing-details-modal');n.classList.toggle('show')})})});const x=p(u,"orders");async function A(t){const n=w(u,"orders",t);await b(n);await S();// Reload the list after deletion
}
// 1. Your existing loadOrders function stays as is:
async function S(){const t=i(x,f("timestamp","desc"));const n=await g(t);const a=document.getElementById("ordersContainer");a.innerHTML="";// Clear previous
n.forEach(n=>{const t=n.data();const s=document.createElement("div");s.classList.add("customer");s.innerHTML=`
      <span class="booking-number">#${t.bookingCode}</span>
      
      <span class="time-from-now">
        <span class="booking-type">${t.bookingType}</span>
        <span class="FullName">Name: ${t.name||"N/A"}</span>
        <span class="age">Age: ${t.age}</span>
        <span class="phone">${t.phone}</span>
        <span class="email">${t.email}</span>
        <span class="date-from">Date: ${t.appointmentDate}</span>
        <span class="time-from">Time: ${t.appointmentTime}</span>
        <span class="minutes-from">${t.EstimatedTime} minutes</span>
      </span>

      <div class="price-piercing">
        <span class="price">${t.totalPrice}₦</span>
        <button class="piercing-button">Details</button>
        <button class="delete-button">Delete</button>
      </div>

      <div class="piercing-details-modal">
        ${t.piercingDetails}
      </div>
    `;a.appendChild(s);const e=s.querySelector(".delete-button");e.addEventListener("click",async()=>{const t=confirm("Are you sure you want to delete this order?");if(t){await A(n.id)}})})}
// 2. New function to search by booking code
async function I(a){const t=i(x,f("timestamp","desc"));const n=await g(t);const o=document.getElementById("ordersContainer");o.innerHTML="";n.forEach(n=>{const t=n.data();if(t.bookingCode&&t.bookingCode.toLowerCase().includes(a.toLowerCase())){const s=document.createElement("div");s.classList.add("customer");s.innerHTML=`
        <span class="booking-number">#${t.bookingCode}</span>
        
        <span class="time-from-now">
          <span class="booking-type">${t.bookingType}</span>
          <span class="FullName">Name: ${t.name||"N/A"}</span>
          <span class="age">Age: ${t.age}</span>
          <span class="phone">${t.phone}</span>
          <span class="email">${t.email}</span>
          <span class="date-from">Date: ${t.appointmentDate}</span>
          <span class="time-from">Time: ${t.appointmentTime}</span>
          <span class="minutes-from">${t.EstimatedTime} minutes</span>
        </span>

        <div class="price-piercing">
          <span class="price">${t.totalPrice}₦</span>
          <button class="piercing-button">Details</button>
          <button class="delete-button">Delete</button>
        </div>

        <div class="piercing-details-modal">
          ${t.piercingDetails}
        </div>
      `;o.appendChild(s);const e=s.querySelector(".delete-button");e.addEventListener("click",async()=>{const t=confirm("Are you sure you want to delete this order?");if(t){await A(n.id)}})}})}
// 3. Input field event listener
const T=document.getElementById("searchInput");T.addEventListener("input",async()=>{const t=T.value.trim();if(t===""){await S();// Reload all if cleared
}else{await I(t);// Search if input exists
}});async function _(a){const t=i(x,f("timestamp","desc"));const n=await g(t);const o=document.getElementById("ordersContainer");o.innerHTML="";n.forEach(n=>{const t=n.data();if(t.appointmentTime&&t.appointmentTime.startsWith(a)){const s=document.createElement("div");s.classList.add("customer");s.innerHTML=`
        <span class="booking-number">#${t.bookingCode}</span>
        <span class="time-from-now">
          <span class="booking-type">${t.bookingType}</span>
          <span class="FullName">Name: ${t.name||"N/A"}</span>
          <span class="age">Age: ${t.age}</span>
          <span class="phone">${t.phone}</span>
          <span class="email">${t.email}</span>
          <span class="date-from">Date: ${t.appointmentDate}</span>
          <span class="time-from">Time: ${t.appointmentTime}</span>
          <span class="minutes-from">${t.EstimatedTime} minutes</span>
        </span>
        <div class="price-piercing">
          <span class="price">${t.totalPrice}₦</span>
          <button class="piercing-button">Details</button>        
          <button class="delete-button">Delete</button>
      </div>
        <div class="piercing-details-modal">${t.piercingDetails}</div>
      `;o.appendChild(s);const e=s.querySelector(".delete-button");e.addEventListener("click",async()=>{const t=confirm("Are you sure you want to delete this order?");if(t){await A(n.id)}})}})}async function R(a){const t=i(x,f("timestamp","desc"));const n=await g(t);const o=document.getElementById("ordersContainer");o.innerHTML="";n.forEach(n=>{const t=n.data();if(t.appointmentDate===a){const s=document.createElement("div");s.classList.add("customer");s.innerHTML=`
        <span class="booking-number">#${t.bookingCode}</span>
        <span class="time-from-now">
          <span class="booking-type">${t.bookingType}</span>
          <span class="FullName">Name: ${t.name||"N/A"}</span>
          <span class="age">Age: ${t.age}</span>
          <span class="phone">${t.phone}</span>
          <span class="email">${t.email}</span>
          <span class="date-from">Date: ${t.appointmentDate}</span>
          <span class="time-from">Time: ${t.appointmentTime}</span>
          <span class="minutes-from">${t.EstimatedTime} minutes</span>
        </span>
        <div class="price-piercing">
          <span class="price">${t.totalPrice}₦</span>
          <button class="piercing-button">Details</button>
          <button class="delete-button">Delete</button>
        </div>
        <div class="piercing-details-modal">${t.piercingDetails}</div>
      `;o.appendChild(s);const e=s.querySelector(".delete-button");e.addEventListener("click",async()=>{const t=confirm("Are you sure you want to delete this order?");if(t){await A(n.id)}})}})}async function q(a){const t=i(x,f("timestamp","desc"));const n=await g(t);const o=document.getElementById("ordersContainer");o.innerHTML="";n.forEach(n=>{const t=n.data();if(t.name&&t.name.toLowerCase().includes(a.toLowerCase())){const s=document.createElement("div");s.classList.add("customer");s.innerHTML=`
        <span class="booking-number">#${t.bookingCode}</span>
        <span class="time-from-now">
          <span class="booking-type">${t.bookingType}</span>
          <span class="FullName">Name: ${t.name||"N/A"}</span>
          <span class="age">Age: ${t.age}</span>
          <span class="phone">${t.phone}</span>
          <span class="email">${t.email}</span>
          <span class="date-from">Date: ${t.appointmentDate}</span>
          <span class="time-from">Time: ${t.appointmentTime}</span>
          <span class="minutes-from">${t.EstimatedTime} minutes</span>
        </span>
        <div class="price-piercing">
          <span class="price">${t.totalPrice}₦</span>
          <button class="piercing-button">Details</button>
          <button class="delete-button">Delete</button>
        </div>
        <div class="piercing-details-modal">${t.piercingDetails}</div>
      `;o.appendChild(s);const e=s.querySelector(".delete-button");e.addEventListener("click",async()=>{const t=confirm("Are you sure you want to delete this order?");if(t){await A(n.id)}})}})}document.getElementById("searchInput").addEventListener("input",t=>{I(t.target.value)});document.getElementById("nameInput").addEventListener("input",t=>{q(t.target.value)});document.getElementById("dateInput").addEventListener("input",t=>{R(t.target.value)});document.getElementById("hourInput").addEventListener("change",t=>{_(t.target.value)});document.addEventListener("click",function(n){if(n.target.classList.contains("piercing-button")){const t=n.target.closest(".customer").querySelector(".piercing-details-modal");t.classList.toggle("show")}});S();let C=[];// <-- Move this outside so it's global
let F={};let z=false;document.addEventListener("DOMContentLoaded",function(){const t=new Date;
// Set the start of today
const n=new Date(t.getFullYear(),t.getMonth(),t.getDate());
// Set the end of three weeks from today
let a;
// Initialize flatpickr with month-day format
async function i(t=[]){const e=new Date;const n=new Date(e.getFullYear(),e.getMonth(),e.getDate());
// Convert preselectedDates to an array of Date objects
const s=t.map(t=>{
// Assuming doc.availableDays is a date string in MM-DD format, e.g., "01-25"
if(typeof t==='string'){const[n,s]=t.split('-').map(Number);return new Date(e.getFullYear(),n-1,s);// Create a Date object
}return null;// or handle other formats
}).filter(t=>t!==null);// Remove any null values
a=flatpickr("#inline-availability-calendar",{i:true,mode:"multiple",l:n,// Don't allow past days
m:s,u:"m-d",// Format as month-day
disable:[function(t){return t.getTime()<n.getTime();// Disable past dates
}],p:function(t,n,s){C=t.map(t=>`${t.getMonth()+1}-${t.getDate()}`// Month-Day format
);C=[...new Set(C)];const e=document.getElementById("weekly-availability");if(e){e.value=C.join(", ")}}})}
// Fetch saved availability for the current selected days
async function m(){try{const n=p(u,"schedule");const s=await g(n);const o=[];s.forEach(t=>{const n=t.data();const s=t.id;// Format: MM-DD
if(n.g&&n.g[s]){const{start:e,end:a}=n.g[s];F[s]={start:e,end:a};// ✅ Store times in dayTimes object
o.push({v:s,g:s});console.log("Fetched available day from DB:",s,"Time:",e,a)}});
// Fill selectedDays from DB
C=o.map(t=>t.v);console.log("Selected Days:",C);// ✅ Log it
// Update hidden input
const e=document.getElementById("weekly-availability");if(e){e.value=C.join(", ")}
// Initialize calendar with these dates
i(C)}catch(t){console.error("Error fetching saved availability:",t)}
// Optional: Update the time list if modal is already open or for immediate feedback
if(document.getElementById("time-modal").style.display==="block"){c();// We’ll define this next
}}function c(){j.innerHTML="";// Clear old entries
C.forEach(t=>{const n=document.createElement("div");n.classList.add("day-entry");n.innerHTML=`
      <div style="display: flex; align-items: center; width: 100%; gap: 10px;">
        <div style="flex: 1;"><strong>${t}</strong></div>
        <div class="time-display" style="flex: 1; width: 100px;">${F[t]?.start||"--:--"} - ${F[t]?.end||"--:--"}</div>
        <div style="flex: 1;"><button class="time-availability select-time-btn" data-day="${t}">Set Time</button></div>
      </div>
    `;j.appendChild(n)})}
// Replace this block:
P.onclick=()=>{j.innerHTML="";// ← REMOVE THIS
C.forEach(t=>{
// ... create and append logic ...
});B.style.display="block"};
// With this:
P.onclick=()=>{c();B.style.display="block"};
// Initial fetch and calendar setup
m();
// Save availability
document.getElementById("save-availability").addEventListener("click",async()=>{if(!z){alert("Please confirm the times before saving.");return}const t=C.every(t=>{const n=F[t];return n&&n.start&&n.end});if(!t){alert("Please ensure all selected days have valid times set.");return}const s={};C.forEach(t=>{s[t]={...F[t],$:new Date}});try{const e=p(u,"schedule");const o=await g(e);const a=new Date;const i=[];
// Gather all currently saved day IDs (e.g., "04-23")
o.forEach(t=>{i.push(t.id)});
// Determine days to delete: not in selectedDays or in the past
const c=new Date(a.getFullYear(),a.getMonth(),a.getDate());const l=i.filter(t=>{const[n,s]=t.split("-").map(Number);const e=new Date(a.getFullYear(),n-1,s);return!C.includes(t)||e<c});
// Delete those days
const d=l.map(t=>b(w(u,"schedule",t)));
// Save new/updated availability
const r=C.map(t=>{const n=w(u,"schedule",t);return H(n,{g:s,$:new Date})});await Promise.all([...d,...r]);alert("Availability saved!");document.getElementById("availability-modal").style.display="none";// ✅ CLOSE MODAL
await m()}catch(n){console.error("Error saving availability:",n);alert("Failed to save availability.")}})});
// Modal logic
document.addEventListener("DOMContentLoaded",function(){const n=document.getElementById("availability-modal");const t=document.getElementById("open-availability-modal");t.onclick=()=>{n.style.display="block"};window.onclick=t=>{if(t.target==n){n.style.display="none"}}});const B=document.getElementById("time-modal");const P=document.getElementById("open-modal");const G=document.querySelector(".close");const j=document.getElementById("days-time-list");
// Store times for each day
P.onclick=()=>{j.innerHTML="";// Clear previous entries
C.forEach(t=>{const n=document.createElement("div");n.classList.add("day-entry");n.innerHTML=`
    <div style="display: flex; align-items: center; width: 100%; gap: 10px;">
      <div style="flex: 1;"><strong>${t}</strong></div>
      <div class="time-display" style="flex: 1; width: 100px;">${F[t]?.start||"--:--"} - ${F[t]?.end||"--:--"}</div>
      <div style="flex: 1;"><button class="time-availability select-time-btn" data-day="${t}">Set Time</button></div>
    </div>
  `;j.appendChild(n)});B.style.display="block"};G.onclick=()=>{B.style.display="none"};window.onclick=t=>{if(t.target==B){B.style.display="none"}};let U="";document.addEventListener("click",function(t){if(t.target.classList.contains("select-time-btn")){U=t.target.getAttribute("data-day");
// Open select-timing modal
document.getElementById("select-timing").style.display="block"}});document.addEventListener("click",function(t){if(t.target.classList.contains("select-time-btn")){U=t.target.getAttribute("data-day");
// Reset all dropdowns to default (00)
document.querySelector(".start-hour").value="00";document.querySelector(".start-minute").value="00";document.querySelector(".end-hour").value="00";document.querySelector(".end-minute").value="00";
// Open select-timing modal
document.getElementById("select-timing").style.display="block"}});document.getElementById("save-time-btn").addEventListener("click",()=>{const t=parseInt(document.querySelector(".start-hour").value);const n=parseInt(document.querySelector(".start-minute").value);const s=parseInt(document.querySelector(".end-hour").value);const e=parseInt(document.querySelector(".end-minute").value);
// Check for valid values
if(isNaN(t)||isNaN(n)||isNaN(s)||isNaN(e)){alert("Please select a valid start and end time.");return}
// Compare time values
const a=t*60+n;const o=s*60+e;if(o<=a){alert("End time must be later than start time.");return}const i=`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`;const c=`${String(s).padStart(2,"0")}:${String(e).padStart(2,"0")}`;const l=`${i} - ${c}`;
// Save to data object
F[U]={start:i,end:c};
// Update the time-display inside the correct day-entry
document.querySelectorAll(".day-entry").forEach(t=>{const n=t.querySelector(".select-time-btn");if(n&&n.getAttribute("data-day")===U){const s=t.querySelector(".time-display");if(s){s.textContent=l}}});
// Close modal and reset selects
document.getElementById("select-timing").style.display="none";document.querySelector(".start-hour").value="00";document.querySelector(".start-minute").value="00";document.querySelector(".end-hour").value="00";document.querySelector(".end-minute").value="00"});
// Close modal and reset selects
const J=()=>{document.getElementById("select-timing").style.display="none";document.querySelector(".start-hour").value="00";document.querySelector(".start-minute").value="00";document.querySelector(".end-hour").value="00";document.querySelector(".end-minute").value="00"};document.querySelector(".close-select-timing").onclick=J;window.addEventListener("click",t=>{const n=document.getElementById("select-timing");if(t.target===n){J()}});document.querySelector(".confirm-availability").addEventListener("click",()=>{const t=C.every(t=>{const n=F[t];return n&&n.start&&n.end&&n.start!=="--:--"&&n.end!=="--:--"});if(!t){alert("Please set time for all selected days before confirming.");return}z=true;alert("Time confirmed for all selected days!");document.getElementById("time-modal").style.display="none"});

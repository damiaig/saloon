import{db as I}from"./firebase-config.js";// Import only the Firestore reference
import{collection as B,addDoc as _,query as u,where as m,getDocs as d}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";const e=document.querySelector(".hamburger-menu");const t=document.querySelector(".divaaa");const n=document.body;const o=document.getElementById("piercingContainer");const f=document.getElementById("selectedPiercingsList");const i=document.getElementById("totalPrice");function a(){t.style.display="block";t.style.opacity="1";t.style.visibility="visible";t.style.transform="translateY(0)";e?.classList.add("active");n.style.overflow="hidden"}function c(){t.style.opacity="0";t.style.visibility="hidden";t.style.transform="translateY(-20px)";setTimeout(()=>{t.style.display="none"},300);e?.classList.remove("active");n.style.overflow=""}function s(){const e=window.getComputedStyle(t);if(e.display==="block"&&e.opacity==="1"){c()}else{a()}}e?.addEventListener("click",s);function r(){if(window.innerWidth>700){t.style.display="none";n.style.overflow=""}}window.addEventListener("resize",r);r();
// Call buttons
document.querySelectorAll(".call, .calll").forEach(e=>e.addEventListener("click",()=>{window.location.href="tel:+2347077403684"}));
// Instagram
document.querySelector(".instagram")?.addEventListener("click",function(){window.open("https://www.instagram.com/piercings_by_e_?igsh=MWRyeTN6Zng2YmExZA==","_blank")});
// Map buttons
document.querySelectorAll(".map, .mapp").forEach(e=>e.addEventListener("click",()=>{const e="https://maps.app.goo.gl/gYAVkmLnA3apd4Uc7?g_st=ic";// Add full URL
window.open(e,"_blank")}));
// Instagram
// WhatsApp buttons (currently using tel - update if needed)
// WhatsApp buttons
document.querySelectorAll(".whatsapp, .whatsap").forEach(e=>e.addEventListener("click",()=>{const e="https://wa.me/2347077403684?text=Hello%20Ifueko%2C%20I'm%20interested%20in%20your%20services";window.open(e,"_blank")}));async function l(){const e=B(I,"schedule");// your Firestore collection
const t=await d(e);const n={};// Use an object to map date -> { start, end }
t.forEach(e=>{const t=e.data();// e.g., { availableDays: { "4-29": { start: "10:00", end: "14:00" }, ... } }
if(t.availableDays){Object.entries(t.availableDays).forEach(([e,t])=>{n[e]=t;// { start, end }
})}});
// Log each date with its start and end time
console.log("Available days with time:");Object.entries(n).forEach(([e,{start:t,end:n}])=>{console.log(`${e}: Start - ${t}, End - ${n}`)});return n}document.addEventListener("DOMContentLoaded",async()=>{
// Fetch available days from Firestore
const f=await l();const o=new Date;const e=`${o.getMonth()+1}-${o.getDate()}`;// ✔ matches "4-7"
// Convert availableDays to an array of Date objects
const n=Object.keys(f).map(e=>{const[t,n]=e.split("-").map(Number);return new Date(o.getFullYear(),t-1,n)});Object.entries(f).forEach(([e,t])=>{const[n,o]=e.split("-").map(e=>parseInt(e));// convert "04-07" to 4-7
f[`${n}-${o}`]=t});
// Initialize flatpickr with the enabled dates
flatpickr("#inline-calendar",{t:true,o:"today",i:"today",disable:[t=>!n.some(e=>{return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()})],l:function(e,t){const n=document.getElementById("linked-date");if(n)n.value=t;const o=e[0];if(!o)return;const i=o.getMonth()+1;const a=o.getDate();const c=`${i}-${a}`;const s=f[c];if(!s){console.warn(`No available time for ${c}`);return}
// Generate new HTML and replace existing
const r=document.querySelector(".time-picker");if(r){r.innerHTML=`
          <div class="ya">  
            <label for="hour">Hour</label>
            <select class="hour">
              <option value="00" disabled selected>00</option>
              <option value="07">7 AM</option>
              <option value="08">8 AM</option>
              <option value="09">9 AM</option>
              <option value="10">10 AM</option>
              <option value="11">11 AM</option>
              <option value="12">12 PM</option>
              <option value="13">1 PM</option>
              <option value="14">2 PM</option>
              <option value="15">3 PM</option>
              <option value="16">4 PM</option>
              <option value="17">5 PM</option>
              <option value="18">6 PM</option>
              <option value="19">7 PM</option>
              <option value="20">8 PM</option>
            </select>
          </div>
          <span class="colon">:</span>
          <div class="ya"> 
            <label for="minute">Minute</label>
            <select class="minute">
              <option disabled selected>00</option>
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
          </div>
        `}
// Now filter hours according to available time
const l=parseInt(s.start.split(":")[0]);const p=parseInt(s.end.split(":")[0]);const u=document.querySelector(".hour");if(!u)return;const m=u.querySelectorAll("option");m.forEach(e=>{const t=parseInt(e.value);if(!isNaN(t)){if(t>=l&&t<p){e.disabled=false;e.style.display="block"}else{e.disabled=true;e.style.display="none"}}else{e.disabled=true;e.style.display="block";// Keep the placeholder visible
}});
// Auto-select the first valid hour
const d=Array.from(m).find(e=>!e.disabled&&e.value!=="00");if(d)u.value=d.value}});flatpickr("#linked-date",{i:"today",disable:[t=>!n.some(e=>{return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()})],l:function(e,t){const n=document.getElementById("linked-date");if(n)n.value=t;const o=e[0];if(!o)return;const i=o.getMonth()+1;const a=o.getDate();const c=`${i}-${a}`;const s=f[c];if(!s){console.warn(`No available time for ${c}`);return}
// Generate new HTML and replace existing
const r=document.querySelector(".time-picker");if(r){r.innerHTML=`
          <div class="ya">  
            <label for="hour">Hour</label>
            <select class="hour">
              <option value="00" disabled selected>00</option>
              <option value="07">7 AM</option>
              <option value="08">8 AM</option>
              <option value="09">9 AM</option>
              <option value="10">10 AM</option>
              <option value="11">11 AM</option>
              <option value="12">12 PM</option>
              <option value="13">1 PM</option>
              <option value="14">2 PM</option>
              <option value="15">3 PM</option>
              <option value="16">4 PM</option>
              <option value="17">5 PM</option>
              <option value="18">6 PM</option>
              <option value="19">7 PM</option>
              <option value="20">8 PM</option>
            </select>
          </div>
          <span class="colon">:</span>
          <div class="ya"> 
            <label for="minute">Minute</label>
            <select class="minute">
              <option disabled selected>00</option>
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
          </div>
        `}
// Now filter hours according to available time
const l=parseInt(s.start.split(":")[0]);const p=parseInt(s.end.split(":")[0]);const u=document.querySelector(".hour");if(!u)return;const m=u.querySelectorAll("option");m.forEach(e=>{const t=parseInt(e.value);if(!isNaN(t)){if(t>=l&&t<p){e.disabled=false;e.style.display="block"}else{e.disabled=true;e.style.display="none"}}else{e.disabled=true;e.style.display="block";// Keep the placeholder visible
}});
// Auto-select the first valid hour
const d=Array.from(m).find(e=>!e.disabled&&e.value!=="00");if(d)u.value=d.value}});flatpickr("#linked-date2",{i:"today",disable:[t=>!n.some(e=>{return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()})],l:function(e,t){const n=document.getElementById("linked-date2");if(n)n.value=t;const o=e[0];if(!o)return;const i=o.getMonth()+1;const a=o.getDate();const c=`${i}-${a}`;const s=f[c];if(!s){console.warn(`No available time for ${c}`);return}
// Generate new HTML and replace existing
const r=document.querySelector(".time-picker2");if(r){r.innerHTML=`
          <div class="ya2">  
            <label for="hour">Hour</label>
            <select class="hour2">
              <option value="00" disabled selected>00</option>
              <option value="07">7 AM</option>
              <option value="08">8 AM</option>
              <option value="09">9 AM</option>
              <option value="10">10 AM</option>
              <option value="11">11 AM</option>
              <option value="12">12 PM</option>
              <option value="13">1 PM</option>
              <option value="14">2 PM</option>
              <option value="15">3 PM</option>
              <option value="16">4 PM</option>
              <option value="17">5 PM</option>
              <option value="18">6 PM</option>
              <option value="19">7 PM</option>
              <option value="20">8 PM</option>
            </select>
          </div>
          <span class="colon">:</span>
          <div class="ya2"> 
            <label for="minute">Minute</label>
            <select class="minute2">
              <option disabled selected>00</option>
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
          </div>
        `}
// Now filter hours according to available time
const l=parseInt(s.start.split(":")[0]);const p=parseInt(s.end.split(":")[0]);const u=document.querySelector(".hour2");if(!u)return;const m=u.querySelectorAll("option");m.forEach(e=>{const t=parseInt(e.value);if(!isNaN(t)){if(t>=l&&t<p){e.disabled=false;e.style.display="block"}else{e.disabled=true;e.style.display="none"}}else{e.disabled=true;e.style.display="block";// Keep the placeholder visible
}});
// Auto-select the first valid hour
const d=Array.from(m).find(e=>!e.disabled&&e.value!=="00");if(d)u.value=d.value}});
// Set today's date as a placeholder
const t=document.getElementById("linked-date");if(t){const i=new Date;const a=i.toLocaleDateString('en-US');t.placeholder=a}});
// Get elements
const p=document.querySelector('.piercing-btn');const v=document.getElementById("piercingModal");
// Open modal
// Open modal
p.addEventListener('click',()=>{v.classList.add('show')});
// Close modal on outside click
window.addEventListener('click',e=>{if(e.target===v){v.classList.remove('show')}});
// Close modal if clicking outside of the modal box
window.addEventListener('click',e=>{if(e.target===v){v.style.display='none'}});const g={p:[{name:"Helix",u:30,m:1e4,type:"Featured"},{name:"Lobe",u:30,m:6e3,type:"Featured",note:"Per ear"},{name:"Bellybutton Piercing",u:30,m:2e4,type:"Featured"},{name:"Numbing",u:50,m:5e3,type:"Featured",note:"Starting from"},{name:"Jewelry Change",u:30,m:3e3,type:"Featured",note:"Excludes jewelry price"},{name:"Consultation",u:30,m:6e3,type:"Service"}],v:[{name:"Transverse Lobe",u:30,m:9e3,type:"Advanced Ear"},{name:"Daith",u:30,m:12e3,type:"Advanced Ear"},{name:"Forward Helix",u:30,m:12e3,type:"Advanced Ear"},{name:"Industrial",u:30,m:12e3,type:"Advanced Ear"},{name:"Rook",u:30,m:12e3,type:"Advanced Ear"},{name:"Surface Tragus",u:30,m:15e3,type:"Advanced Ear"}],g:[{name:"Numbing",u:50,m:5e3,type:"Service",note:"Starting from"},{name:"Jewelry Change",u:30,m:3e3,type:"Service",note:"Excludes jewelry price"},{name:"Cleaning Piercing",u:30,m:3e3,type:"Service"},{name:"Consultation",u:30,m:6e3,type:"Service"}],h:[{name:"Lobe",u:30,m:6e3,type:"Ear",note:"Per ear"},{name:"Helix",u:30,m:1e4,type:"Ear"},{name:"Tragus",u:30,m:1e4,type:"Ear"},{name:"Flat",u:30,m:1e4,type:"Ear"},{name:"Conch",u:30,m:1e4,type:"Ear"}],P:[{name:"Nostril Piercing",u:30,m:1e4,type:"Nose"},{name:"Septum Piercing",u:30,m:1e4,type:"Nose"},{name:"Nose Bridge Piercing",u:30,m:15e3,type:"Nose"},{name:"Double Nostril Piercing",u:30,m:18e3,type:"Nose"}],k:[{name:"Smiley",u:30,m:12e3,type:"Portrait"},{name:"Tongue (Vertical)",u:30,m:12e3,type:"Portrait"},{name:"Lips Piercing",u:30,m:12e3,type:"Portrait"},{name:"Brow",u:30,m:15e3,type:"Portrait"},{name:"Snake Eyes",u:30,m:15e3,type:"Portrait"},{name:"Frog Eyes",u:30,m:15e3,type:"Portrait"}],$:[{name:"Back Dermals",u:45,m:6e4,type:"Dermal"},{name:"Micro Dermals",u:30,m:35e3,type:"Dermal"},{name:"Surface Dermals",u:30,m:3e4,type:"Dermal"},{name:"Face/Chest Dermal",u:30,m:35e3,type:"Dermal"}],M:[{name:"Anti Eyebrow Piercing",u:30,m:15e3,type:"18+"},{name:"Bellybutton Piercing",u:30,m:2e4,type:"18+"},{name:"Cheeks Piercing",u:30,m:2e4,type:"18+"},{name:"Nipple Piercing",u:30,m:25e3,type:"18+"},{name:"Genital Piercing",u:60,m:7e4,type:"18+"}]};const y=document.getElementById("piercingContainer");const b=document.getElementById("totalPrice");const w=document.querySelectorAll(".filter-btn");
// ✅ Declare this globally
let j=[];function h(){f.innerHTML="";let l=0;let p=0;
// Track names that have been processed to avoid duplicate minutes if quantity > 1
const u=new Set;j.forEach((e,t)=>{if(!e.D)e.D=1;const n=document.createElement("div");n.classList.add("selected-row");const o=document.createElement("span");o.textContent=e.name;o.classList.add("selected-name");const i=document.createElement("span");i.textContent=" - ";i.classList.add("qty-btn");i.style.cursor="pointer";i.addEventListener("click",()=>{if(e.D>1){e.D--}else{j.splice(t,1)}h()});const a=document.createElement("span");a.textContent=e.D;a.classList.add("qty-display");const c=document.createElement("span");c.textContent=" + ";c.classList.add("qty-btn");c.style.cursor="pointer";c.addEventListener("click",()=>{e.D++;h()});const s=document.createElement("span");s.textContent=`₦${e.m*e.D}`;s.classList.add("selected-price");
// Append elements
n.appendChild(o);n.appendChild(i);n.appendChild(a);n.appendChild(c);n.appendChild(s);f.appendChild(n);l+=e.m*e.D;
// ✅ Only add minutes once per unique piercing instance
const r=`${e.name}-${t}`;if(!u.has(e.name)){p+=e.u||0;u.add(e.name)}});i.textContent=l;
// Optional: show total minutes in a span
}function P(e){y.innerHTML="";const t=g[e];if(!t||t.length===0){y.innerHTML="<p>No piercings available in this category.</p>";return}t.forEach(t=>{const n=document.createElement("div");n.classList.add("select-pierce");const e=t.type||"Not specified";let o=t.name;if(t.name==="Consultation"){o=window.innerWidth<359?"Consult-ation":"Consultation"}n.innerHTML=`
        <h4>${o}</h4>
        <p>Type: ${e}</p>
        <p>₦${t.m}</p>
        <p>${t.u}mins</p>
      `;n.addEventListener("click",()=>{const e=j.findIndex(e=>e.name===t.name&&e.m===t.m);if(e>-1){
// Item already selected — increment quantity
j[e].D+=1}else{
// New selection
j.push({...t,D:1})}n.classList.add("selected");// Optional: style logic here
h()});y.appendChild(n)});h()}
// Initial render
P("Featured Services");
// Filter click
w.forEach(e=>{e.addEventListener("click",()=>{w.forEach(e=>e.classList.remove("active"));e.classList.add("active");P(e.dataset.category)})});
// Open modal
document.querySelector(".piercing-btn").addEventListener("click",()=>{v.style.display="block"});
// Close modal
document.querySelector(".close").addEventListener("click",()=>{v.style.display="none"});window.addEventListener("click",e=>{if(e.target===v){v.style.display="none"}});function k(t){const e=j.findIndex(e=>e.name===t.name);if(e>-1){j.splice(e,1);// Remove if already selected
}else{j.push(t);// Add if not selected
}h()}const $=document.createElement('div');$.addEventListener("click",()=>{const e=j.findIndex(e=>e.name===item.name&&e.m===item.m);if(e>-1){j.splice(e,1);$.classList.remove("selected")}else{j.push({...item,D:1});$.classList.add("selected")}h()});const M=B(I,"orders");async function F(i,e,t){if(!i||!e){alert("Please select both a date and time.");return false}try{const o=u(M,m("appointmentDate","==",i));const a=await d(o);const[c,s]=e.split(":");const r=new Date(`${i}T${c.padStart(2,'0')}:${s.padStart(2,'0')}`);const l=new Date(r.getTime()+t*6e4);// finish time of new booking
const p=a.docs.some(e=>{const t=e.data();const n=new Date(`${i}T${t.A}`);const o=new Date(`${i}T${t.N}`);
// Updated logic: finish time is now treated as blocking too
return r>=n&&r<=o||// new start is within an existing range (inclusive of end)
l>n&&l<=o||// new end is within an existing range
r<=n&&l>=o});if(p){alert(`❌ The time slot ${e} on ${i} overlaps with another booking. Please choose a different time.`);return false}return true}catch(n){console.error("Error checking availability:",n);alert("There was an error checking the booking availability. Please try again.");return false}}document.querySelector(".submit").addEventListener("click",async function(e){e.preventDefault();const t=document.getElementById("fullName").value.trim();const n=document.getElementById("email").value.trim();const o=parseInt(document.getElementById("age").value.trim());const i=document.getElementById("number").value.trim();const a=window.innerWidth<=700?document.getElementById("linked-date2"):document.getElementById("linked-date");const c=window.innerWidth<=700?document.querySelector(".hour2"):document.querySelector(".hour");const s=window.innerWidth<=700?document.querySelector(".minute2"):document.querySelector(".minute");const r=a.value.trim();const l=`${c.value}:${s.value}`;if(!j||j.length===0){alert("Please select at least one type of piercing.");return}if(!n||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)){alert("Please enter a valid email address.");return}if(!i||i.length<7||isNaN(i)){alert("Please enter a valid phone number.");return}if(!o||isNaN(o)){alert("Please enter your age.");return}let p;if(window.innerWidth<=700){p=document.getElementById("linked-date2")?.value.trim()}else{p=document.getElementById("linked-date")?.value.trim()}const u=j.some(e=>e.type==="18+");if(u&&o<18){alert("You are not old enough for 18+ piercings.");return}if(!p){alert("Please select a date.");return}let m,d;if(window.innerWidth<=700){m=document.querySelector(".hour2")?.value||"00";d=document.querySelector(".minute2")?.value||"00"}else{m=document.querySelector(".hour")?.value||"00";d=document.querySelector(".minute")?.value||"00"}if(m==="00"){alert("Please select a valid time.");return}
// ✅ Everything passed – show confirmation modal
const f=document.getElementById("confirmationModal");const v=document.getElementById("confirmationDetails");
// Create detail text
// Step 1: Count piercings by name
const g={};const y={};// Initialize here
j.forEach(e=>{g[e.name]={m:e.m,D:e.D};if(!y[e.name]){y[e.name]=e.u*e.D;// ⬅ multiply by quantity
}});
// Step 2: Create formatted piercing list with quantity
const b=Object.entries(g).map(([e,t])=>{return`${e} (x${t.D})`}).join(", ");
// Step 3: Calculate total price
const w=Object.values(g).reduce((e,t)=>{return e+t.m*t.D},0);const h=Object.values(y).reduce((e,t)=>e+t,0);const P=await F(r,l,h);if(!P)return;
// Calculate estimated finish time
const k=new Date(`${p}T${m.padStart(2,'0')}:${d.padStart(2,'0')}`);const $=new Date(k.getTime()+h*6e4);// add minutes in ms
// Format to HH:MM for DB storage
const M=$.toTimeString().slice(0,5);// e.g., "14:30"
// Step 4: Format total price in Naira with commas
const D=`₦${w.toLocaleString()}`;
// Step 5: Create final HTML
const A=`
<p><strong>Name:</strong> ${t}</p>
  <p><strong>Email:</strong> ${n}</p>
  <p><strong>Phone:</strong> ${i}</p>
  <p><strong>Age:</strong> ${o}</p>
  <p><strong>Piercings:</strong> ${b}</p>
  <p><strong>Date:</strong> ${p}</p>
  <p><strong>Time:</strong> ${m}:${d}</p>
  <p><strong>Total Price:</strong> ${D}</p>
  <p><strong>Estimated Duration:</strong> ${h} minutes</p>
`;v.innerHTML=A;f.style.display="block";
// Step 6: Calculate total minutes
j.forEach(e=>{const t=`${e.name}_${e.u}`;if(!y[t]){y[t]=e.u}});
// Store formData for later
const N={name:t,email:n,phone:i,T:o,S:b,C:p,A:`${m}:${d}`,I:w,B:`${h}`,N:M};let E=false;let T=false;const S=document.getElementById("payAndBook");const C=document.getElementById("bookInAdvance");S.onclick=function(){if(E||T)return;E=true;S.disabled=true;C.disabled=true;S.innerText="Processing...";const e=PaystackPop.setup({key:'pk_test_cb3826dfb6732cf27093aa151b352fb821871dc7',email:N.email,_:N.I*100,currency:"NGN",metadata:{j:[{F:N.name,L:"phone",value:N.phone}]},O:function(i){(async()=>{const e=Math.floor(1e5+Math.random()*9e5).toString();const t={...N,H:"Pay & Book",q:e,Y:i.reference,timestamp:new Date};try{const o=await _(B(I,"orders"),t);console.log("Document saved with ID:",o.id);v.innerHTML+=`
            <div id="confirmation">
              <div class="code">
                <h1>${e}</h1>
                <p><strong>Selected Time:</strong> ${N.A}</p>
                <p><strong>Selected Date:</strong> ${N.C}</p>
                <small>✅ Payment successful. Please screenshot this code as proof of booking.</small>
              </div>
            </div>
          `;alert(`✅ Payment received! Booking confirmed.\nYour booking code is ${e}`);f.scrollIntoView({behavior:"smooth"});setTimeout(()=>location.reload(),12e3)}catch(n){console.error("❌ Error saving booking: ",n);alert("Something went wrong. Payment went through but booking wasn't saved. Contact admin.")}})()},R:function(){alert('Payment was not completed. Booking was not made.');
// Reset both buttons and flags
S.disabled=false;C.disabled=false;S.innerText="Pay & Book";E=false}});e.openIframe()};C.onclick=async function(){if(E||T)return;T=true;S.disabled=true;C.disabled=true;C.innerText="Processing...";const e=Math.floor(1e5+Math.random()*9e5).toString();const t={...N,H:"Book in Advance",q:e,timestamp:new Date};try{const o=await _(B(I,"orders"),t);console.log("Document written with ID: ",o.id);v.innerHTML+=`
      <div id="confirmation">
        <div class="code">
          <h1>${e}</h1>
          <p><strong>Selected Time:</strong> ${N.A}</p>
          <p><strong>Selected Date:</strong> ${N.C}</p>
          <small>Please screenshot this code as proof of booking.</small>
        </div>
      </div>
    `;alert(`📌 Booking confirmed! Please screenshot the code shown and make your payment before the appointment ${e}.`);f.scrollIntoView({behavior:"smooth"});setTimeout(()=>location.reload(),12e3)}catch(n){console.error("❌ Error adding document: ",n);alert("Something went wrong while booking. Error details: "+n.message);
// Reset if failed
S.disabled=false;C.disabled=false;C.innerText="Book in Advance";T=false}};
// Close modal manually
document.querySelector(".close-confirm").onclick=function(){f.style.display="none"};
// Close if clicking outside
window.onclick=function(e){if(e.target===f){f.style.display="none"}}});
// Get name from the URL
const D=new URLSearchParams(window.location.search);const A=D.get('name');if(A){const T=document.querySelector('#fullName');// Change to your actual ID
if(T){T.value=A}}const N=document.getElementById('openPiercingModalBtn');const E=document.querySelector('.piercing-modal-wrapper');N.addEventListener('click',()=>{E.style.display='block'});window.addEventListener('click',e=>{if(e.target===E){E.style.display='none'}});w.forEach(t=>{t.addEventListener("click",()=>{
// Remove active class from all buttons
w.forEach(e=>e.classList.remove("active"));
// Add active class to clicked one
t.classList.add("active");const e=t.getAttribute("data-category");
// Update display text
piercingTypeDisplay.textContent=`Type of piercing: ${e}`;
// Render piercings
P(e);
// Hide modal
E.style.display='none'})});

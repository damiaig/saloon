document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".hamburger-menu");const e=document.querySelector(".divaaa");const o=document.body;function n(){e.style.display="block";e.style.opacity="1";e.style.visibility="visible";e.style.transform="translateY(0)";t?.classList.add("active");o.style.overflow="hidden"}function i(){e.style.opacity="0";e.style.visibility="hidden";e.style.transform="translateY(-20px)";setTimeout(()=>{e.style.display="none"},300);t?.classList.remove("active");o.style.overflow=""}function s(){const t=window.getComputedStyle(e);if(t.display==="block"&&t.opacity==="1"){i()}else{n()}}t?.addEventListener("click",s);function c(){if(window.innerWidth>700){e.style.display="none";o.style.overflow=""}}window.addEventListener("resize",c);c();
// Call buttons
document.querySelectorAll(".call, .calll").forEach(t=>t.addEventListener("click",()=>{window.location.href="tel:+2347077403684"}));
// Instagram
document.querySelector(".instagram")?.addEventListener("click",function(){window.open("https://www.instagram.com/piercings_by_e_?igsh=MWRyeTN6Zng2YmExZA==","_blank")});
// Map buttons
document.querySelectorAll(".map, .mapp").forEach(t=>t.addEventListener("click",()=>{const t="https://maps.app.goo.gl/gYAVkmLnA3apd4Uc7?g_st=ic";// Add full URL
window.open(t,"_blank")}));
// Instagram
// WhatsApp buttons (currently using tel - update if needed)
// WhatsApp buttons
document.querySelectorAll(".whatsapp, .whatsap").forEach(t=>t.addEventListener("click",()=>{const t="https://wa.me/2347077403684?text=Hello%20Ifueko%2C%20I'm%20interested%20in%20your%20services";window.open(t,"_blank")}))});document.querySelector('.submit-btn').addEventListener('click',function(){const t=document.getElementById('custom-text').value.trim();if(t!==''){
// Pass the name through the URL
window.location.href=`book-now.html?name=${encodeURIComponent(t)}`}else{alert("Please enter your name first.")}});import{db as s,storage as t}from"./firebase-config.js";import{getStorage as e,ref as o,uploadBytes as n,getDownloadURL as i,deleteObject as c}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";import{getFirestore as a,collection as m,addDoc as d,query as l,orderBy as r,getDocs as u,deleteDoc as f,doc as w}from"https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";const p=document.querySelector(".image-slider-frame");let g=0;let h=[];let b=[];
// Fetch and render images
async function k(t=false){h=[];const e=l(m(s,"Bookings"),r("timestamp","desc"));const o=await u(e);b=[];for(const n of o.docs){const i=n.data();h.push(i.imageUrl);b.push({id:n.id,url:i.imageUrl,t:i.t})}v();if(t){setTimeout(()=>{document.querySelector(".slider-image")?.scrollIntoView({behavior:"smooth"})},300)}}
// Render slider
function v(){p.innerHTML=`
        <img src="${h[g]}" alt="Slider Image" class="slider-image" />
      `;const o=p.querySelector(".slider-image");const t=document.querySelector(".cha");t.innerHTML=`
        <div class="slider-dots">
          ${h.slice(0,8).map((t,e)=>`
            <span class="dot ${e===g?'active':''}" data-index="${e}"></span>
          `).join('')}
 
        </div>
      `;
// Trigger fade-in
setTimeout(()=>{o.classList.add("active")},50);
// Dot click navigation
document.querySelectorAll(".dot").forEach(t=>{t.onclick=()=>{g=parseInt(t.dataset.index);v()}});
// Swipe support
let n=0;o.addEventListener("touchstart",t=>{n=t.touches[0].clientX});o.addEventListener("touchend",t=>{let e=t.changedTouches[0].clientX;s(e-n)});o.addEventListener("mousedown",t=>{n=t.clientX;o.addEventListener("mouseup",i)});function i(t){o.removeEventListener("mouseup",i);let e=t.clientX;s(e-n)}function s(t){if(Math.abs(t)>50){// minimum swipe distance
if(t>0){
// Swipe right
g=(g-1+h.length)%h.length}else{
// Swipe left
g=(g+1)%h.length}v()}}}
// Auto-slide
setInterval(()=>{if(h.length>1){g=(g+1)%h.length;v()}},5e3);
// Initial load
k();

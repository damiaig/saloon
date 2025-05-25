document.addEventListener("DOMContentLoaded",function(){const n=document.querySelector(".hamburger-menu");const t=document.querySelector(".divaaa");const c=document.body;function e(){t.style.display="block";t.style.opacity="1";t.style.visibility="visible";t.style.transform="translateY(0)";n?.classList.add("active");c.style.overflow="hidden"}function o(){t.style.opacity="0";t.style.visibility="hidden";t.style.transform="translateY(-20px)";setTimeout(()=>{t.style.display="none"},300);n?.classList.remove("active");c.style.overflow=""}function i(){const n=window.getComputedStyle(t);if(n.display==="block"&&n.opacity==="1"){o()}else{e()}}n?.addEventListener("click",i);function a(){if(window.innerWidth>700){t.style.display="none";c.style.overflow=""}}window.addEventListener("resize",a);a();
// Call buttons
document.querySelectorAll(".call, .calll").forEach(n=>n.addEventListener("click",()=>{window.location.href="tel:+2347077403684"}));
// Instagram
document.querySelector(".instagram")?.addEventListener("click",function(){window.open("https://www.instagram.com/piercings_by_e_?igsh=MWRyeTN6Zng2YmExZA==","_blank")});
// Map buttons
document.querySelectorAll(".map, .mapp").forEach(n=>n.addEventListener("click",()=>{const n="https://maps.app.goo.gl/gYAVkmLnA3apd4Uc7?g_st=ic";// Add full URL
window.open(n,"_blank")}));
// Instagram
// WhatsApp buttons (currently using tel - update if needed)
// WhatsApp buttons
document.querySelectorAll(".whatsapp, .whatsap").forEach(n=>n.addEventListener("click",()=>{const n="https://wa.me/2347077403684?text=Hello%20Ifueko%2C%20I'm%20interested%20in%20your%20services";window.open(n,"_blank")}))});

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger-menu");
    const divaaa = document.querySelector(".divaaa");
    const body = document.body;

    function openMenu() {
        divaaa.style.display = "block";
        divaaa.style.opacity = "1";
        divaaa.style.visibility = "visible";
        divaaa.style.transform = "translateY(0)";
        hamburger?.classList.add("active");
        body.style.overflow = "hidden";
    }

    function closeMenu() {
        divaaa.style.opacity = "0";
        divaaa.style.visibility = "hidden";
        divaaa.style.transform = "translateY(-20px)";
        setTimeout(() => {
            divaaa.style.display = "none";
        }, 300);
        hamburger?.classList.remove("active");
        body.style.overflow = "";
    }

    function toggleMenu() {
        const styles = window.getComputedStyle(divaaa);
        if (styles.display === "block" && styles.opacity === "1") {
            closeMenu();
        } else {
            openMenu();
        }
    }

    hamburger?.addEventListener("click", toggleMenu);

    function checkScreenWidth() {
        if (window.innerWidth > 700) {
            divaaa.style.display = "none";
            body.style.overflow = "";
        }
    }

    window.addEventListener("resize", checkScreenWidth);
    checkScreenWidth();

   // Call buttons
document.querySelectorAll(".call, .calll").forEach(el =>
    el.addEventListener("click", () => {
      window.location.href = "tel:+2347077403684";
    })
  );
  
   // Instagram
   document.querySelector(".instagram")?.addEventListener("click", function () {
    window.open("https://www.instagram.com/piercings_by_e_?igsh=MWRyeTN6Zng2YmExZA==", "_blank");
});
  
  // Map buttons
  document.querySelectorAll(".map, .mapp").forEach(el =>
    el.addEventListener("click", () => {
      const mapUrl = "https://maps.app.goo.gl/gYAVkmLnA3apd4Uc7?g_st=ic"; // Add full URL
      window.open(mapUrl, "_blank");
    })
  );
  
  // Instagram
 
  

  // WhatsApp buttons (currently using tel - update if needed)
// WhatsApp buttons
document.querySelectorAll(".whatsapp, .whatsap").forEach(el =>
    el.addEventListener("click", () => {
        const whatsappUrl = "https://wa.me/2347077403684?text=Hello%20Dami%2C%20I'm%20interested%20in%20your%20services";
        window.open(whatsappUrl, "_blank");
    })
  );
  
  
});


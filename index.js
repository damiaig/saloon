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
        const whatsappUrl = "https://wa.me/2347077403684?text=Hello%20Ifueko%2C%20I'm%20interested%20in%20your%20services";
        window.open(whatsappUrl, "_blank");
    })
  );
  
  
  
});









    document.querySelector('.submit-btn').addEventListener('click', function () {
        const name = document.getElementById('custom-text').value.trim();

        if (name !== '') {
            // Pass the name through the URL
            window.location.href = `book-now.html?name=${encodeURIComponent(name)}`;
        } else {
            alert("Please enter your name first.");
        }
    });


    









    import { db, storage } from "./firebase-config.js";
    import {
      getStorage,
      ref,
      uploadBytes,
      getDownloadURL,
      deleteObject
    } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
    
    import {
      getFirestore,
      collection,
      addDoc,
      query,
      orderBy,
      getDocs,
      deleteDoc,
      doc
    } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
    
   
    const sliderFrame = document.querySelector(".image-slider-frame");
    
    let currentIndex = 0;
    let imageURLs = [];
    let savedImages = [];
 
    
  
    
 
 
  
    
    // Fetch and render images
    async function fetchAndDisplayImages(scrollToLatest = false) {
        imageURLs = [];
      const q = query(collection(db, "Bookings"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
    
 
      savedImages = [];
    
      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        imageURLs.push(data.imageUrl);
        savedImages.push({ id: docSnap.id, url: data.imageUrl, storagePath: data.storagePath });
      }
    
      renderSlider();
   
    
      if (scrollToLatest) {
        setTimeout(() => {
          document.querySelector(".slider-image")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
    









    // Render slider
    function renderSlider() {
      sliderFrame.innerHTML = `
        <img src="${imageURLs[currentIndex]}" alt="Slider Image" class="slider-image" />
      `;
    
      const image = sliderFrame.querySelector(".slider-image");
      const dotsContainer = document.querySelector(".cha");
      dotsContainer.innerHTML = `
        <div class="slider-dots">
          ${imageURLs.slice(0, 8).map((_, i) => `
            <span class="dot ${i === currentIndex ? 'active' : ''}" data-index="${i}"></span>
          `).join('')}
 
        </div>
      `;
    
      // Trigger fade-in
      setTimeout(() => {
        image.classList.add("active");
      }, 50);
    
      // Dot click navigation
      document.querySelectorAll(".dot").forEach(dot => {
        dot.onclick = () => {
          currentIndex = parseInt(dot.dataset.index);
          renderSlider();
        };
      });
    
      // Swipe support
      let startX = 0;
    
      image.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
      });
    
      image.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        handleSwipe(endX - startX);
      });
    
      image.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        image.addEventListener("mouseup", mouseUpHandler);
      });
    
      function mouseUpHandler(e) {
        image.removeEventListener("mouseup", mouseUpHandler);
        let endX = e.clientX;
        handleSwipe(endX - startX);
      }
    
      function handleSwipe(deltaX) {
        if (Math.abs(deltaX) > 50) { // minimum swipe distance
          if (deltaX > 0) {
            // Swipe right
            currentIndex = (currentIndex - 1 + imageURLs.length) % imageURLs.length;
          } else {
            // Swipe left
            currentIndex = (currentIndex + 1) % imageURLs.length;
          }
          renderSlider();
        }
      }
    }
    
    
      
    // Auto-slide
    setInterval(() => {
      if (imageURLs.length > 1) {
        currentIndex = (currentIndex + 1) % imageURLs.length;
        renderSlider();
      }
    }, 5000);
    
 
    // Initial load
    fetchAndDisplayImages();
    

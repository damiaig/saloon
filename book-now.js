import { db } from "./firebase-config.js"; // Import only the Firestore reference




import {
 
  collection,
  addDoc,
  query,
 where,
  getDocs,
 
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
    
    
    
    
    
    const hamburger = document.querySelector(".hamburger-menu");
    const divaaa = document.querySelector(".divaaa");
    const body = document.body;





  const piercingContainer = document.getElementById("piercingContainer");
  const selectedPiercingsList = document.getElementById("selectedPiercingsList");
  const totalPriceSpan = document.getElementById("totalPrice");

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

 
 
async function fetchAvailableDays() {
  const availableDaysRef = collection(db, "schedule"); // your Firestore collection
  const querySnapshot = await getDocs(availableDaysRef);

  const availableDaysWithTime = {}; // Use an object to map date -> { start, end }

  querySnapshot.forEach((doc) => {
    const data = doc.data(); // e.g., { availableDays: { "4-29": { start: "10:00", end: "14:00" }, ... } }

    if (data.availableDays) {
      Object.entries(data.availableDays).forEach(([key, value]) => {
        availableDaysWithTime[key] = value; // { start, end }
      });
    }
  });

  // Log each date with its start and end time
  console.log("Available days with time:");
  Object.entries(availableDaysWithTime).forEach(([date, { start, end }]) => {
    console.log(`${date}: Start - ${start}, End - ${end}`);
  });

  return availableDaysWithTime;
}

 

document.addEventListener("DOMContentLoaded", async () => {
  // Fetch available days from Firestore
  const availableDays = await fetchAvailableDays();
  const now = new Date();
  const selectedKey = `${now.getMonth() + 1}-${now.getDate()}`; // ✔ matches "4-7"

  // Convert availableDays to an array of Date objects
  const enabledDates = Object.keys(availableDays).map((dayStr) => {
    const [month, day] = dayStr.split("-").map(Number);
    return new Date(now.getFullYear(), month - 1, day);
  });
  Object.entries(availableDays).forEach(([key, value]) => {

    const [m, d] = key.split("-").map(num => parseInt(num)); // convert "04-07" to 4-7
    availableDays[`${m}-${d}`] = value;
  });
  
  // Initialize flatpickr with the enabled dates
  flatpickr("#inline-calendar", {
    inline: true,
    defaultDate: "today",
    minDate: "today",
    disable: [
      (date) => !enabledDates.some((enabledDate) => {
        return (
          enabledDate.getDate() === date.getDate() &&
          enabledDate.getMonth() === date.getMonth() &&
          enabledDate.getFullYear() === date.getFullYear()
        );
      }),
    ],
    onChange: function(selectedDates, dateStr) {
      const input = document.getElementById("linked-date");
      if (input) input.value = dateStr;
    
      const selected = selectedDates[0];
      if (!selected) return;
    
      const month = selected.getMonth() + 1;
      const day = selected.getDate();
      const selectedKey = `${month}-${day}`;
      const timeRange = availableDays[selectedKey];
    
      if (!timeRange) {
        console.warn(`No available time for ${selectedKey}`);
        return;
      }
    
      // Generate new HTML and replace existing
      const timePicker = document.querySelector(".time-picker");
      if (timePicker) {
        timePicker.innerHTML = `
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
        `;
      }
    
      // Now filter hours according to available time
      const startHour = parseInt(timeRange.start.split(":")[0]);
      const endHour = parseInt(timeRange.end.split(":")[0]);
    
      const hourSelect = document.querySelector(".hour");
      if (!hourSelect) return;
    
      const options = hourSelect.querySelectorAll("option");
    
      options.forEach(option => {
        const val = parseInt(option.value);
        if (!isNaN(val)) {
          if (val >= startHour && val < endHour) {
            option.disabled = false;
            option.style.display = "block";
          } else {
            option.disabled = true;
            option.style.display = "none";
          }
        } else {
          option.disabled = true;
          option.style.display = "block"; // Keep the placeholder visible
        }
      });
    
      // Auto-select the first valid hour
      const firstValid = Array.from(options).find(
        opt => !opt.disabled && opt.value !== "00"
      );
      if (firstValid) hourSelect.value = firstValid.value;
    }
    
    ,
  });

  flatpickr("#linked-date", {
    minDate: "today",
    disable: [
      (date) => !enabledDates.some((enabledDate) => {
        return (
          enabledDate.getDate() === date.getDate() &&
          enabledDate.getMonth() === date.getMonth() &&
          enabledDate.getFullYear() === date.getFullYear()
        );
      }),
    ],
    onChange: function(selectedDates, dateStr) {
      const input = document.getElementById("linked-date");
      if (input) input.value = dateStr;
    
      const selected = selectedDates[0];
      if (!selected) return;
    
      const month = selected.getMonth() + 1;
      const day = selected.getDate();
      const selectedKey = `${month}-${day}`;
      const timeRange = availableDays[selectedKey];
    
      if (!timeRange) {
        console.warn(`No available time for ${selectedKey}`);
        return;
      }
    
      // Generate new HTML and replace existing
      const timePicker = document.querySelector(".time-picker");
      if (timePicker) {
        timePicker.innerHTML = `
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
        `;
      }
    
      // Now filter hours according to available time
      const startHour = parseInt(timeRange.start.split(":")[0]);
      const endHour = parseInt(timeRange.end.split(":")[0]);
    
      const hourSelect = document.querySelector(".hour");
      if (!hourSelect) return;
    
      const options = hourSelect.querySelectorAll("option");
    
      options.forEach(option => {
        const val = parseInt(option.value);
        if (!isNaN(val)) {
          if (val >= startHour && val < endHour) {
            option.disabled = false;
            option.style.display = "block";
          } else {
            option.disabled = true;
            option.style.display = "none";
          }
        } else {
          option.disabled = true;
          option.style.display = "block"; // Keep the placeholder visible
        }
      });
    
      // Auto-select the first valid hour
      const firstValid = Array.from(options).find(
        opt => !opt.disabled && opt.value !== "00"
      );
      if (firstValid) hourSelect.value = firstValid.value;
    },
  });



  
  flatpickr("#linked-date2", {
    minDate: "today",
    disable: [
      (date) => !enabledDates.some((enabledDate) => {
        return (
          enabledDate.getDate() === date.getDate() &&
          enabledDate.getMonth() === date.getMonth() &&
          enabledDate.getFullYear() === date.getFullYear()
        );
      }),
    ],
    onChange: function(selectedDates, dateStr) {
      const input = document.getElementById("linked-date2");
      if (input) input.value = dateStr;
    
      const selected = selectedDates[0];
      if (!selected) return;
    
      const month = selected.getMonth() + 1;
      const day = selected.getDate();
      const selectedKey = `${month}-${day}`;
      const timeRange = availableDays[selectedKey];
    
      if (!timeRange) {
        console.warn(`No available time for ${selectedKey}`);
        return;
      }
    
      // Generate new HTML and replace existing
      const timePicker = document.querySelector(".time-picker2");
      if (timePicker) {
        timePicker.innerHTML = `
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
        `;
      }
    
      // Now filter hours according to available time
      const startHour = parseInt(timeRange.start.split(":")[0]);
      const endHour = parseInt(timeRange.end.split(":")[0]);
    
      const hourSelect = document.querySelector(".hour2");
      if (!hourSelect) return;
    
      const options = hourSelect.querySelectorAll("option");
    
      options.forEach(option => {
        const val = parseInt(option.value);
        if (!isNaN(val)) {
          if (val >= startHour && val < endHour) {
            option.disabled = false;
            option.style.display = "block";
          } else {
            option.disabled = true;
            option.style.display = "none";
          }
        } else {
          option.disabled = true;
          option.style.display = "block"; // Keep the placeholder visible
        }
      });
    
      // Auto-select the first valid hour
      const firstValid = Array.from(options).find(
        opt => !opt.disabled && opt.value !== "00"
      );
      if (firstValid) hourSelect.value = firstValid.value;
    },
  });



  // Set today's date as a placeholder
  const input = document.getElementById("linked-date");
  if (input) {
    const today = new Date();
    const formattedToday = today.toLocaleDateString('en-US');
    input.placeholder = formattedToday;
  }
});

  



 
  // Get elements
  const piercingBtn = document.querySelector('.piercing-btn');

  const modal = document.getElementById("piercingModal");

  // Open modal
// Open modal
piercingBtn.addEventListener('click', () => {
  modal.classList.add('show');
});

// Close modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});


 

  // Close modal if clicking outside of the modal box
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });



const piercings = {
  "Featured Services": [
    { name: "Helix", minutes: 30, price: 10000, type: "Featured" },
    { name: "Lobe", minutes: 30, price: 6000, type: "Featured", note: "Per ear" },
    { name: "Bellybutton Piercing", minutes: 30, price: 20000, type: "Featured" },
    { name: "Numbing", minutes: 50, price: 5000, type: "Featured", note: "Starting from" },
    { name: "Jewelry Change", minutes: 30, price: 3000, type: "Featured", note: "Excludes jewelry price" },
    { name: "Consultation", minutes: 30, price: 6000, type: "Service" }
  ],

  "Advanced Ear Piercing": [
    { name: "Transverse Lobe", minutes: 30, price: 9000, type: "Advanced Ear" },
    { name: "Daith", minutes: 30, price: 12000, type: "Advanced Ear" },
    { name: "Forward Helix", minutes: 30, price: 12000, type: "Advanced Ear" },
    { name: "Industrial", minutes: 30, price: 12000, type: "Advanced Ear" },
    { name: "Rook", minutes: 30, price: 12000, type: "Advanced Ear" },
    { name: "Surface Tragus", minutes: 30, price: 15000, type: "Advanced Ear" }
  ],

  "Tattoo & Piercing": [
    { name: "Numbing", minutes: 50, price: 5000, type: "Service", note: "Starting from" },
    { name: "Jewelry Change", minutes: 30, price: 3000, type: "Service", note: "Excludes jewelry price" },
    { name: "Cleaning Piercing", minutes: 30, price: 3000, type: "Service" },
    { name: "Consultation", minutes: 30, price: 6000, type: "Service" },
  ],

  "Ear Piercings": [
    { name: "Lobe", minutes: 30, price: 6000, type: "Ear", note: "Per ear" },
    { name: "Helix", minutes: 30, price: 10000, type: "Ear" },
    { name: "Tragus", minutes: 30, price: 10000, type: "Ear" },
    { name: "Flat", minutes: 30, price: 10000, type: "Ear" },
    { name: "Conch", minutes: 30, price: 10000, type: "Ear" }
  ],

  "Nose Piercings": [
    { name: "Nostril Piercing", minutes: 30, price: 10000, type: "Nose" },
    { name: "Septum Piercing", minutes: 30, price: 10000, type: "Nose" },
    { name: "Nose Bridge Piercing", minutes: 30, price: 15000, type: "Nose" },
    { name: "Double Nostril Piercing", minutes: 30, price: 18000, type: "Nose" }
  ],

  "Portrait Piercing": [
    { name: "Smiley", minutes: 30, price: 12000, type: "Portrait" },
    { name: "Tongue (Vertical)", minutes: 30, price: 12000, type: "Portrait" },
    { name: "Lips Piercing", minutes: 30, price: 12000, type: "Portrait" },
    { name: "Brow", minutes: 30, price: 15000, type: "Portrait" },
    { name: "Snake Eyes", minutes: 30, price: 15000, type: "Portrait" },
    { name: "Frog Eyes", minutes: 30, price: 15000, type: "Portrait" }
  ],

  "Dermals": [
    { name: "Back Dermals", minutes: 45, price: 60000, type: "Dermal" },
    { name: "Micro Dermals", minutes: 30, price: 35000, type: "Dermal" },
    { name: "Surface Dermals", minutes: 30, price: 30000, type: "Dermal" },
    { name: "Face/Chest Dermal", minutes: 30, price: 35000, type: "Dermal" }
  ],

  "18+ Piercing": [
    { name: "Anti Eyebrow Piercing", minutes: 30, price: 15000, type: "18+" },
    { name: "Bellybutton Piercing", minutes: 30, price: 20000, type: "18+" },
    { name: "Cheeks Piercing", minutes: 30, price: 20000, type: "18+" },
    { name: "Nipple Piercing", minutes: 30, price: 25000, type: "18+" },
    { name: "Genital Piercing", minutes: 60, price: 70000, type: "18+" }
  ]
};

  
  
  
  const container = document.getElementById("piercingContainer");
  const totalPriceDisplay = document.getElementById("totalPrice");
  const filterButtons = document.querySelectorAll(".filter-btn");
  
  // ✅ Declare this globally
  let selectedPiercings = [];
  function updateSelectedListAndTotal() {
    selectedPiercingsList.innerHTML = "";
    let total = 0;
    let totalMinutes = 0;
  
    // Track names that have been processed to avoid duplicate minutes if quantity > 1
    const uniqueMinutesSet = new Set();
  
    selectedPiercings.forEach((piercing, index) => {
      if (!piercing.quantity) piercing.quantity = 1;
  
      const row = document.createElement("div");
      row.classList.add("selected-row");
  
      const nameEl = document.createElement("span");
      nameEl.textContent = piercing.name;
      nameEl.classList.add("selected-name");
  
      const minusSpan = document.createElement("span");
      minusSpan.textContent = " - ";
      minusSpan.classList.add("qty-btn");
      minusSpan.style.cursor = "pointer";
  
      minusSpan.addEventListener("click", () => {
        if (piercing.quantity > 1) {
          piercing.quantity--;
        } else {
          selectedPiercings.splice(index, 1);
        }
        updateSelectedListAndTotal();
      });
  
      const qtyDisplay = document.createElement("span");
      qtyDisplay.textContent = piercing.quantity;
      qtyDisplay.classList.add("qty-display");
  
      const plusSpan = document.createElement("span");
      plusSpan.textContent = " + ";
      plusSpan.classList.add("qty-btn");
      plusSpan.style.cursor = "pointer";
  
      plusSpan.addEventListener("click", () => {
        piercing.quantity++;
        updateSelectedListAndTotal();
      });
  
      const priceEl = document.createElement("span");
      priceEl.textContent = `₦${piercing.price * piercing.quantity}`;
      priceEl.classList.add("selected-price");
  
      // Append elements
      row.appendChild(nameEl);
      row.appendChild(minusSpan);
      row.appendChild(qtyDisplay);
      row.appendChild(plusSpan);
      row.appendChild(priceEl);
      selectedPiercingsList.appendChild(row);
  
      total += piercing.price * piercing.quantity;
  
      // ✅ Only add minutes once per unique piercing instance
      const uniqueKey = `${piercing.name}-${index}`;
      if (!uniqueMinutesSet.has(piercing.name)) {
        totalMinutes += piercing.minutes || 0;
        uniqueMinutesSet.add(piercing.name);
      }
    });
  
    totalPriceSpan.textContent = total;
  
    // Optional: show total minutes in a span
  
  }
  

  
  
  function renderPiercings(category) {
    container.innerHTML = "";
 
  
    const piercingList = piercings[category];
    if (!piercingList || piercingList.length === 0) {
      container.innerHTML = "<p>No piercings available in this category.</p>";
      return;
    }
  
    piercingList.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("select-pierce");
  
      const piercingType = item.type || "Not specified";

      
      let displayName = item.name;
      if (item.name === "Consultation") {
        displayName = window.innerWidth < 359 ? "Consult-ation" : "Consultation";
      }
      

      div.innerHTML = `
        <h4>${displayName}</h4>
        <p>Type: ${piercingType}</p>
        <p>₦${item.price}</p>
        <p>${item.minutes}mins</p>
      `;
      
    
   
        div.addEventListener("click", () => {
          const index = selectedPiercings.findIndex(p => p.name === item.name && p.price === item.price);
        
          if (index > -1) {
            // Item already selected — increment quantity
            selectedPiercings[index].quantity += 1;
          } else {
            // New selection
            selectedPiercings.push({ ...item, quantity: 1 });
          }
        
          div.classList.add("selected"); // Optional: style logic here
          updateSelectedListAndTotal();
        });
        
      
    
      
  
      container.appendChild(div);
    });
  
    updateSelectedListAndTotal();
  }
 
  // Initial render
  renderPiercings("Featured Services");


  // Filter click
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPiercings(btn.dataset.category);
    });
  });

  // Open modal
  document.querySelector(".piercing-btn").addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Close modal
  document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
 

 
 
 

function togglePiercingSelection(piercing) {
  const index = selectedPiercings.findIndex(p => p.name === piercing.name);

  if (index > -1) {
    selectedPiercings.splice(index, 1); // Remove if already selected
  } else {
    selectedPiercings.push(piercing); // Add if not selected
  }

  updateSelectedListAndTotal();
}
 
const div = document.createElement('div');

div.addEventListener("click", () => {
  const index = selectedPiercings.findIndex(p => p.name === item.name && p.price === item.price);
  if (index > -1) {
    selectedPiercings.splice(index, 1);
    div.classList.remove("selected");
  } else {
    selectedPiercings.push({ ...item, quantity: 1 });
    div.classList.add("selected");
  }

  updateSelectedListAndTotal();
});



const ordersRef = collection(db, "orders");


async function checkAvailabilityBeforeBooking(selectedDate, selectedTime, durationInMinutes) {
  if (!selectedDate || !selectedTime) {
    alert("Please select both a date and time.");
    return false;
  }

  try {
    const q = query(ordersRef, where("appointmentDate", "==", selectedDate));
    const snapshot = await getDocs(q);

    const [hourStr, minuteStr] = selectedTime.split(":");
    const startTime = new Date(`${selectedDate}T${hourStr.padStart(2, '0')}:${minuteStr.padStart(2, '0')}`);
    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000); // finish time of new booking

    const isConflict = snapshot.docs.some(doc => {
      const data = doc.data();
      const existingStart = new Date(`${selectedDate}T${data.appointmentTime}`);
      const existingEnd = new Date(`${selectedDate}T${data.estimatedFinishTime}`);
    
      // Updated logic: finish time is now treated as blocking too
      return (
        (startTime >= existingStart && startTime <= existingEnd) || // new start is within an existing range (inclusive of end)
        (endTime > existingStart && endTime <= existingEnd) ||      // new end is within an existing range
        (startTime <= existingStart && endTime >= existingEnd)      // new booking wraps around an existing one
      );
    });
    

    if (isConflict) {
      alert(`❌ The time slot ${selectedTime} on ${selectedDate} overlaps with another booking. Please choose a different time.`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking availability:", error);
    alert("There was an error checking the booking availability. Please try again.");
    return false;
  }
}



document.querySelector(".submit").addEventListener("click", async function (e) {
  e.preventDefault();

 
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = parseInt(document.getElementById("age").value.trim());
  const phone = document.getElementById("number").value.trim();

  const dateInput = window.innerWidth <= 700 ? document.getElementById("linked-date2") : document.getElementById("linked-date");
  const hourSelect = window.innerWidth <= 700 ? document.querySelector(".hour2") : document.querySelector(".hour");
  const minuteSelect = window.innerWidth <= 700 ? document.querySelector(".minute2") : document.querySelector(".minute");


  const selectedDate = dateInput.value.trim();
  const selectedTime = `${hourSelect.value}:${minuteSelect.value}`;

 
 



  if (!selectedPiercings || selectedPiercings.length === 0) {
    alert("Please select at least one type of piercing.");
    return;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!phone || phone.length < 7 || isNaN(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  if (!age || isNaN(age)) {
    alert("Please enter your age.");
    return;
  }

  let chosenDate;
  if (window.innerWidth <= 700) {
    chosenDate = document.getElementById("linked-date2")?.value.trim();
  } else {
    chosenDate = document.getElementById("linked-date")?.value.trim();
  }
  


  const has18Plus = selectedPiercings.some(p => p.type === "18+");
  if (has18Plus && age < 18) {
    alert("You are not old enough for 18+ piercings.");
    return;
  }

  if (!chosenDate) {
    alert("Please select a date.");
    return;
  }
 
  let hour, minute;

  if (window.innerWidth <= 700) {
    hour = document.querySelector(".hour2")?.value || "00";
    minute = document.querySelector(".minute2")?.value || "00";
  } else {
    hour = document.querySelector(".hour")?.value || "00";
    minute = document.querySelector(".minute")?.value || "00";
  }

  if (hour === "00") {
    alert("Please select a valid time.");
    return;
  }


  // ✅ Everything passed – show confirmation modal
  const confirmationModal = document.getElementById("confirmationModal");
  const confirmationDetails = document.getElementById("confirmationDetails");

  // Create detail text
// Step 1: Count piercings by name
const piercingMap = {};
const minutesMap = {}; // Initialize here

selectedPiercings.forEach(p => {
  piercingMap[p.name] = {
    price: p.price,
    quantity: p.quantity // ✅ Use actual quantity from object
  };

  if (!minutesMap[p.name]) {
    minutesMap[p.name] = p.minutes * p.quantity; // ⬅ multiply by quantity
  }
});



// Step 2: Create formatted piercing list with quantity
const piercingDetails = Object.entries(piercingMap).map(([name, data]) => {
  return `${name} (x${data.quantity})`;
}).join(", ");

// Step 3: Calculate total price
const totalPrice = Object.values(piercingMap).reduce((sum, p) => {
  return sum + (p.price * p.quantity);
}, 0);
 
const totalMinutes = Object.values(minutesMap).reduce((sum, m) => sum + m, 0);
const isAvailable = await checkAvailabilityBeforeBooking(selectedDate, selectedTime, totalMinutes);
if (!isAvailable) return;
// Calculate estimated finish time
const appointmentStart = new Date(`${chosenDate}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`);
const estimatedFinishTime = new Date(appointmentStart.getTime() + totalMinutes * 60000); // add minutes in ms

// Format to HH:MM for DB storage
const estimatedFinishStr = estimatedFinishTime.toTimeString().slice(0, 5); // e.g., "14:30"

// Step 4: Format total price in Naira with commas
const formattedPrice = `₦${totalPrice.toLocaleString()}`;

// Step 5: Create final HTML
const detailHTML = `
<p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone}</p>
  <p><strong>Age:</strong> ${age}</p>
  <p><strong>Piercings:</strong> ${piercingDetails}</p>
  <p><strong>Date:</strong> ${chosenDate}</p>
  <p><strong>Time:</strong> ${hour}:${minute}</p>
  <p><strong>Total Price:</strong> ${formattedPrice}</p>
  <p><strong>Estimated Duration:</strong> ${totalMinutes} minutes</p>
`;

confirmationDetails.innerHTML = detailHTML;
confirmationModal.style.display = "block";
// Step 6: Calculate total minutes
 
selectedPiercings.forEach(p => {
  const key = `${p.name}_${p.minutes}`;
  if (!minutesMap[key]) {
    minutesMap[key] = p.minutes;
  }
});
 
// Store formData for later
const formData = {
  name,
  email,
  phone,
  age,
  piercingDetails,
  appointmentDate: chosenDate,
  appointmentTime: `${hour}:${minute}`,
  totalPrice,
EstimatedTime: `${totalMinutes}`,
estimatedFinishTime: estimatedFinishStr
};

document.getElementById("payAndBook").onclick = function () {

  const button = this;
  button.disabled = true;
  button.innerText = "Processing...";

  const handler = PaystackPop.setup({
    key: 'pk_test_cb3826dfb6732cf27093aa151b352fb821871dc7',
    email: formData.email,
    amount: formData.totalPrice * 100,
    currency: "NGN",
    metadata: {
      custom_fields: [
        {
          display_name: formData.name,
          variable_name: "phone",
          value: formData.phone
        }
      ]
    },
    callback: function (response) {
      // Move the async logic into an IIFE (Immediately Invoked Function Expression)
      (async () => {
        const bookingCode = Math.floor(100000 + Math.random() * 900000).toString();

        const fullData = {
          ...formData,
          bookingType: "Pay & Book",
          bookingCode,
          paystackRef: response.reference,
          timestamp: new Date()
        };

        try {
          const docRef = await addDoc(collection(db, "orders"), fullData);
          console.log("Document saved with ID:", docRef.id);

          confirmationDetails.innerHTML += `
          <div id="confirmation">
            <div class="code">
              <h1>${bookingCode}</h1>
              <p><strong>Selected Time:</strong> ${formData.appointmentTime}</p>
              <p><strong>Selected Date:</strong> ${formData.appointmentDate}</p>
              <small>✅ Payment successful. Please screenshot this code as proof of booking.</small>
           
            </div>
          </div>
        `;
        

          alert(`✅ Payment received! Booking confirmed.\nYour booking code is ${bookingCode}`);
          confirmationModal.scrollIntoView({ behavior: "smooth" });

          setTimeout(() => location.reload(), 12000);
        } catch (error) {
          console.error("❌ Error saving booking: ", error);
          alert("Something went wrong. Payment went through but booking wasn't saved. Contact admin.");
        }
      })();
    },
    onClose: function () {
      alert('Payment was not completed. Booking was not made.');
      
      button.disabled = false;
      button.innerText = "Pay & Book";
    }
  });

  handler.openIframe();
};

  

  document.getElementById("bookInAdvance").onclick = async function () {

    const button = this;
    button.disabled = true;
    button.innerText = "Processing...";
    // 1. Generate a 6-digit code
    const bookingCode = Math.floor(100000 + Math.random() * 900000).toString();
  
    // 2. Add the extra details
    const fullData = {
      ...formData,
      bookingType: "Book in Advance",
      bookingCode,
      timestamp: new Date()
    };
  
    try {
      // 3. Store in Firestore under "orders"
      const docRef = await addDoc(collection(db, "orders"), fullData);
      console.log("Document written with ID: ", docRef.id);
  
      // 4. Show confirmation with code
      confirmationDetails.innerHTML += `
      <div id="confirmation">
        <div class="code">
        <h1>${bookingCode}</h1>
        <p><strong>Selected Time:</strong> ${formData.appointmentTime}</p>
        <p><strong>Selected Date:</strong> ${formData.appointmentDate}</p>
         <small>Please screenshot this code as proof of booking.</small>
         </div>
      </div>
    `;
    
  
      alert(`📌 Booking confirmed! Please screenshot the code shown and make your payment before the appointment    ${bookingCode}.`);
  
      // Optional: Scroll to modal or highlight it
      confirmationModal.scrollIntoView({ behavior: "smooth" });
  
      setTimeout(() => {
        location.reload();
      }, 12000);
      

    } catch (error) {
      console.error("❌ Error adding document: ", error);
      alert("Something went wrong while booking. Error details: " + error.message);
      button.disabled = false;
      button.innerText = "Book in Advance";
    }
  };

  // Close modal manually
  document.querySelector(".close-confirm").onclick = function () {
    confirmationModal.style.display = "none";
  };

  // Close if clicking outside
  window.onclick = function (e) {
    if (e.target === confirmationModal) {
      confirmationModal.style.display = "none";
    }
  };
});


 

 


 


 
    // Get name from the URL
    const params = new URLSearchParams(window.location.search);
    const nameFromURL = params.get('name');

    if (nameFromURL) {
        const fullNameInput = document.querySelector('#fullName'); // Change to your actual ID
        if (fullNameInput) {
            fullNameInput.value = nameFromURL;
        }
    }
 

   





 
 



    
    const openModalBtn = document.getElementById('openPiercingModalBtn');
    const modalWrapper = document.querySelector('.piercing-modal-wrapper');
  
    openModalBtn.addEventListener('click', () => {
      modalWrapper.style.display = 'block';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === modalWrapper) {
        modalWrapper.style.display = 'none';
      }
    });
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
    
        // Add active class to clicked one
        button.classList.add("active");
    
        const selectedCategory = button.getAttribute("data-category");
    
        // Update display text
        piercingTypeDisplay.textContent = `Type of piercing: ${selectedCategory}`;
    
        // Render piercings
        renderPiercings(selectedCategory);
    
        // Hide modal
        modalWrapper.style.display = 'none';

      });
    });
    

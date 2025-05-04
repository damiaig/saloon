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
  getDoc,
  orderBy,
  setDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const storedCode = sessionStorage.getItem("adminCode");

if (storedCode !== "9876546789876") {
  // Not authorized — clear any session data and redirect
  sessionStorage.clear();
  window.location.href = "admin.login.html";
}


const photoInput = document.getElementById("photoInput");
const uploadBtn = document.getElementById("uploadBtn");
const uploadStatus = document.getElementById("uploadStatus");
const sliderFrame = document.querySelector(".image-slider-frame");

let currentIndex = 0;
let imageURLs = [];
let savedImages = [];
let unsavedFiles = [];

uploadBtn.addEventListener("click", async () => {
  const file = photoInput.files[0];
  if (!file) return;

  const timestamp = Date.now();
  const fileName = `bookings/images/${timestamp}_${file.name}`;
  const storageRef = ref(storage, fileName);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, "Bookings"), {
      imageUrl: downloadURL,
      timestamp: timestamp,
      storagePath: fileName
    });

    uploadStatus.textContent = "Upload successful!";
    uploadStatus.style.color = "green";
    fetchAndDisplayImages(true);
  } catch (error) {
    uploadStatus.textContent = "Upload failed.";
    uploadStatus.style.color = "red";
  }
});

// Image Preview
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    imageURLs.unshift(e.target.result);
    unsavedFiles.unshift({ file, url: e.target.result });
    renderSlider();
    renderDeleteList();
  };
  reader.readAsDataURL(file);
});

// Save Button
// Save Button
// Save Button
const saveBtn = document.createElement("button");
saveBtn.textContent = "Save";
saveBtn.className = "custom-save-btn"; // Use class for styling

// Append save button inside the .btn div
document.querySelector(".btn").appendChild(saveBtn);


saveBtn.addEventListener("click", async () => {
  // 👉 Show the loader
  document.querySelector(".loader-overlay").style.display = "flex";

  for (let i = 0; i < unsavedFiles.length; i++) {
    const { file } = unsavedFiles[i];
    const timestamp = Date.now();
    const path = `bookings/images/${timestamp}_${file.name}`;
    const storageRef = ref(storage, path);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, "Bookings"), {
      imageUrl: downloadURL,
      timestamp: timestamp,
      storagePath: path
    });
  }

  unsavedFiles = [];
  await fetchAndDisplayImages(true);
  renderDeleteList();

  // ✅ Optional slight delay before reloading to show completed state
  setTimeout(() => {
    location.reload();
  }, 500); // Can adjust or remove
});


// Fetch and render images
async function fetchAndDisplayImages(scrollToLatest = false) {
  const q = query(collection(db, "Bookings"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  imageURLs = unsavedFiles.map((f) => f.url);
  savedImages = [];

  for (const docSnap of querySnapshot.docs) {
    const data = docSnap.data();
    imageURLs.push(data.imageUrl);
    savedImages.push({ id: docSnap.id, url: data.imageUrl, storagePath: data.storagePath });
  }

  renderSlider();
  renderDeleteList();

  if (scrollToLatest) {
    setTimeout(() => {
      document.querySelector(".slider-image")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }
}

// Render slider
function renderSlider() {
    sliderFrame.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="arrow left" height="34px" viewBox="0 -960 960 960" width="34px" fill="#980c0c">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
      </svg>
      <img src="${imageURLs[currentIndex]}" alt="Slider Image" class="slider-image" />
      <svg xmlns="http://www.w3.org/2000/svg" class="arrow right" height="34px" viewBox="0 -960 960 960" width="34px" fill="#980c0c">
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
      </svg>
   
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
    // Trigger fade-in with a small delay
    setTimeout(() => {
        image.classList.add("active");
    }, 50); // Short delay to ensure opacity transition
  
    sliderFrame.querySelector(".left").onclick = () => {
        currentIndex = (currentIndex - 1 + imageURLs.length) % imageURLs.length;
        renderSlider();
    };
  
    sliderFrame.querySelector(".right").onclick = () => {
        currentIndex = (currentIndex + 1) % imageURLs.length;
        renderSlider();
    };
  
    document.querySelectorAll(".dot").forEach(dot => {
        dot.onclick = () => {
            currentIndex = parseInt(dot.dataset.index);
            renderSlider();
        };
    });
}

  
// Auto-slide
setInterval(() => {
  if (imageURLs.length > 1) {
    currentIndex = (currentIndex + 1) % imageURLs.length;
    renderSlider();
  }
}, 5000);

// Render delete list
function renderDeleteList() {
  const ul = document.querySelector(".delete");
  if (!ul) return;

  ul.innerHTML = "";

  imageURLs.forEach((url, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      Image ${index + 1} <span style="color:red; cursor:pointer;" data-index="${index}">&times;</span>
    `;
    ul.appendChild(li);
  });

  document.querySelectorAll(".delete span").forEach(span => {
    span.addEventListener("click", async (e) => {
      const index = parseInt(e.target.dataset.index);

      const unsaved = unsavedFiles.find(u => u.url === imageURLs[index]);
      if (unsaved) {
        unsavedFiles = unsavedFiles.filter(f => f.url !== unsaved.url);
      } else {
        const saved = savedImages.find(s => s.url === imageURLs[index]);
        if (saved) {
          await deleteDoc(doc(db, "Bookings", saved.id));
          await deleteObject(ref(storage, saved.storagePath));
        }
      }

      imageURLs.splice(index, 1);
      renderSlider();
      renderDeleteList();
    });
  });
}

// Initial load
fetchAndDisplayImages();
 
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.piercing-button').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const modal = btn.closest('.customer').querySelector('.piercing-details-modal');
        modal.classList.toggle('show');
      });
    });
  });
 









const ordersRef = collection(db, "orders");
 

async function deleteOrder(id) {
  const orderDoc = doc(db, "orders", id);
  await deleteDoc(orderDoc);
  await loadOrders(); // Reload the list after deletion
}

// 1. Your existing loadOrders function stays as is:
async function loadOrders() {
  const q = query(ordersRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const container = document.getElementById("ordersContainer");
  container.innerHTML = ""; // Clear previous

  querySnapshot.forEach(doc => {
    const data = doc.data();

    const customerDiv = document.createElement("div");
    customerDiv.classList.add("customer");

    customerDiv.innerHTML = `
      <span class="booking-number">#${data.bookingCode}</span>
      
      <span class="time-from-now">
        <span class="booking-type">${data.bookingType}</span>
        <span class="FullName">Name: ${data.name || "N/A"}</span>
        <span class="age">Age: ${data.age}</span>
        <span class="phone">${data.phone}</span>
        <span class="email">${data.email}</span>
        <span class="date-from">Date: ${data.appointmentDate}</span>
        <span class="time-from">Time: ${data.appointmentTime}</span>
        <span class="minutes-from">${data.EstimatedTime} minutes</span>
      </span>

      <div class="price-piercing">
        <span class="price">${data.totalPrice}₦</span>
        <button class="piercing-button">Details</button>
        <button class="delete-button">Delete</button>
      </div>

      <div class="piercing-details-modal">
        ${data.piercingDetails}
      </div>
    `;

    container.appendChild(customerDiv);
    const deleteBtn = customerDiv.querySelector(".delete-button");
deleteBtn.addEventListener("click", async () => {
  const confirmed = confirm("Are you sure you want to delete this order?");
  if (confirmed) {
    await deleteOrder(doc.id);
  }
});

  });
}

// 2. New function to search by booking code
async function searchOrdersByCode(code) {
  const q = query(ordersRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const container = document.getElementById("ordersContainer");
  container.innerHTML = "";

  querySnapshot.forEach(doc => {
    const data = doc.data();

    if (data.bookingCode && data.bookingCode.toLowerCase().includes(code.toLowerCase())) {
      const customerDiv = document.createElement("div");
      customerDiv.classList.add("customer");

      customerDiv.innerHTML = `
        <span class="booking-number">#${data.bookingCode}</span>
        
        <span class="time-from-now">
          <span class="booking-type">${data.bookingType}</span>
          <span class="FullName">Name: ${data.name || "N/A"}</span>
          <span class="age">Age: ${data.age}</span>
          <span class="phone">${data.phone}</span>
          <span class="email">${data.email}</span>
          <span class="date-from">Date: ${data.appointmentDate}</span>
          <span class="time-from">Time: ${data.appointmentTime}</span>
          <span class="minutes-from">${data.EstimatedTime} minutes</span>
        </span>

        <div class="price-piercing">
          <span class="price">${data.totalPrice}₦</span>
          <button class="piercing-button">Details</button>
          <button class="delete-button">Delete</button>
        </div>

        <div class="piercing-details-modal">
          ${data.piercingDetails}
        </div>
      `;

      container.appendChild(customerDiv);
      const deleteBtn = customerDiv.querySelector(".delete-button");
deleteBtn.addEventListener("click", async () => {
  const confirmed = confirm("Are you sure you want to delete this order?");
  if (confirmed) {
    await deleteOrder(doc.id);
  }
});

    }
  });
}

// 3. Input field event listener
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", async () => {
  const searchValue = searchInput.value.trim();

  if (searchValue === "") {
    await loadOrders(); // Reload all if cleared
  } else {
    await searchOrdersByCode(searchValue); // Search if input exists
  }
});

async function searchOrdersByHour(hour) {
  const q = query(ordersRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const container = document.getElementById("ordersContainer");
  container.innerHTML = "";

  querySnapshot.forEach(doc => {
    const data = doc.data();

    if (data.appointmentTime && data.appointmentTime.startsWith(hour)) {
      const customerDiv = document.createElement("div");
      customerDiv.classList.add("customer");

      customerDiv.innerHTML = `
        <span class="booking-number">#${data.bookingCode}</span>
        <span class="time-from-now">
          <span class="booking-type">${data.bookingType}</span>
          <span class="FullName">Name: ${data.name || "N/A"}</span>
          <span class="age">Age: ${data.age}</span>
          <span class="phone">${data.phone}</span>
          <span class="email">${data.email}</span>
          <span class="date-from">Date: ${data.appointmentDate}</span>
          <span class="time-from">Time: ${data.appointmentTime}</span>
          <span class="minutes-from">${data.EstimatedTime} minutes</span>
        </span>
        <div class="price-piercing">
          <span class="price">${data.totalPrice}₦</span>
          <button class="piercing-button">Details</button>        
          <button class="delete-button">Delete</button>
      </div>
        <div class="piercing-details-modal">${data.piercingDetails}</div>
      `;

      container.appendChild(customerDiv);
      const deleteBtn = customerDiv.querySelector(".delete-button");
deleteBtn.addEventListener("click", async () => {
  const confirmed = confirm("Are you sure you want to delete this order?");
  if (confirmed) {
    await deleteOrder(doc.id);
  }
});

    }
  });
}

async function searchOrdersByDate(date) {
  const q = query(ordersRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const container = document.getElementById("ordersContainer");
  container.innerHTML = "";

  querySnapshot.forEach(doc => {
    const data = doc.data();

    if (data.appointmentDate === date) {
      const customerDiv = document.createElement("div");
      customerDiv.classList.add("customer");

      customerDiv.innerHTML = `
        <span class="booking-number">#${data.bookingCode}</span>
        <span class="time-from-now">
          <span class="booking-type">${data.bookingType}</span>
          <span class="FullName">Name: ${data.name || "N/A"}</span>
          <span class="age">Age: ${data.age}</span>
          <span class="phone">${data.phone}</span>
          <span class="email">${data.email}</span>
          <span class="date-from">Date: ${data.appointmentDate}</span>
          <span class="time-from">Time: ${data.appointmentTime}</span>
          <span class="minutes-from">${data.EstimatedTime} minutes</span>
        </span>
        <div class="price-piercing">
          <span class="price">${data.totalPrice}₦</span>
          <button class="piercing-button">Details</button>
          <button class="delete-button">Delete</button>
        </div>
        <div class="piercing-details-modal">${data.piercingDetails}</div>
      `;

      container.appendChild(customerDiv);
      const deleteBtn = customerDiv.querySelector(".delete-button");
deleteBtn.addEventListener("click", async () => {
  const confirmed = confirm("Are you sure you want to delete this order?");
  if (confirmed) {
    await deleteOrder(doc.id);
  }
});

    }
  });
}


async function searchOrdersByName(name) {
  const q = query(ordersRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const container = document.getElementById("ordersContainer");
  container.innerHTML = "";

  querySnapshot.forEach(doc => {
    const data = doc.data();

    if (data.name && data.name.toLowerCase().includes(name.toLowerCase())) {
      const customerDiv = document.createElement("div");
      customerDiv.classList.add("customer");

      customerDiv.innerHTML = `
        <span class="booking-number">#${data.bookingCode}</span>
        <span class="time-from-now">
          <span class="booking-type">${data.bookingType}</span>
          <span class="FullName">Name: ${data.name || "N/A"}</span>
          <span class="age">Age: ${data.age}</span>
          <span class="phone">${data.phone}</span>
          <span class="email">${data.email}</span>
          <span class="date-from">Date: ${data.appointmentDate}</span>
          <span class="time-from">Time: ${data.appointmentTime}</span>
          <span class="minutes-from">${data.EstimatedTime} minutes</span>
        </span>
        <div class="price-piercing">
          <span class="price">${data.totalPrice}₦</span>
          <button class="piercing-button">Details</button>
          <button class="delete-button">Delete</button>
        </div>
        <div class="piercing-details-modal">${data.piercingDetails}</div>
      `;

      container.appendChild(customerDiv);
      const deleteBtn = customerDiv.querySelector(".delete-button");
deleteBtn.addEventListener("click", async () => {
  const confirmed = confirm("Are you sure you want to delete this order?");
  if (confirmed) {
    await deleteOrder(doc.id);
  }
});

    }
  });
}






document.getElementById("searchInput").addEventListener("input", (e) => {
  searchOrdersByCode(e.target.value);
});

document.getElementById("nameInput").addEventListener("input", (e) => {
  searchOrdersByName(e.target.value);
});

document.getElementById("dateInput").addEventListener("input", (e) => {
  searchOrdersByDate(e.target.value);
});

document.getElementById("hourInput").addEventListener("change", (e) => {
  searchOrdersByHour(e.target.value);
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("piercing-button")) {
    const modal = e.target.closest(".customer").querySelector(".piercing-details-modal");
    modal.classList.toggle("show");
  }
});

loadOrders();
let selectedDays = []; // <-- Move this outside so it's global
let dayTimes = {};
let isTimeConfirmed = false;


document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  
  // Set the start of today
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  // Set the end of three weeks from today
 
let calendarInstance;
  // Initialize flatpickr with month-day format
  async function initCalendar(preselectedDates = []) {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
 
  
    // Convert preselectedDates to an array of Date objects
    const validDates = preselectedDates.map(doc => {
      // Assuming doc.availableDays is a date string in MM-DD format, e.g., "01-25"
      if (typeof doc === 'string') {
        const [month, day] = doc.split('-').map(Number);
        return new Date(today.getFullYear(), month - 1, day); // Create a Date object
      }
      return null; // or handle other formats
    }).filter(date => date !== null); // Remove any null values
    
  
    calendarInstance = flatpickr("#inline-availability-calendar", {
      inline: true,
      mode: "multiple",
      minDate: startOfToday, // Don't allow past days
   
      defaultDate: validDates,
      dateFormat: "m-d", // Format as month-day
      disable: [
        function (date) {
          return date.getTime() < startOfToday.getTime(); // Disable past dates
        }
      ],
      onChange: function (selectedDates, dateStr, instance) {
        selectedDays = selectedDates.map(date =>
          `${date.getMonth() + 1}-${date.getDate()}` // Month-Day format
        );
        selectedDays = [...new Set(selectedDays)];
  
        const input = document.getElementById("weekly-availability");
        if (input) {
          input.value = selectedDays.join(", ");
        }
      }
    });
  }
  

  // Fetch saved availability for the current selected days
async function fetchSavedAvailability() {
  try {
    const scheduleRef = collection(db, "schedule");
    const snapshot = await getDocs(scheduleRef);

    const savedAvailability = [];

  snapshot.forEach(docSnap => {
  const data = docSnap.data();
  const date = docSnap.id; // Format: MM-DD

  if (data.availableDays && data.availableDays[date]) {
    const { start, end } = data.availableDays[date];
    dayTimes[date] = { start, end }; // ✅ Store times in dayTimes object
    savedAvailability.push({ date, availableDays: date });
    console.log("Fetched available day from DB:", date, "Time:", start, end);
  }
});


    // Fill selectedDays from DB
    selectedDays = savedAvailability.map(doc => doc.date);
    console.log("Selected Days:", selectedDays); // ✅ Log it

    // Update hidden input
    const input = document.getElementById("weekly-availability");
    if (input) {
      input.value = selectedDays.join(", ");
    }

    // Initialize calendar with these dates
    initCalendar(selectedDays);
  } catch (error) {
    console.error("Error fetching saved availability:", error);
  }
  // Optional: Update the time list if modal is already open or for immediate feedback
if (document.getElementById("time-modal").style.display === "block") {
  renderDayTimeList(); // We’ll define this next
}

}
function renderDayTimeList() {
  daysTimeList.innerHTML = ""; // Clear old entries
  selectedDays.forEach(day => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("day-entry");

    wrapper.innerHTML = `
      <div style="display: flex; align-items: center; width: 100%; gap: 10px;">
        <div style="flex: 1;"><strong>${day}</strong></div>
        <div class="time-display" style="flex: 1; width: 100px;">${dayTimes[day]?.start || "--:--"} - ${dayTimes[day]?.end || "--:--"}</div>
        <div style="flex: 1;"><button class="time-availability select-time-btn" data-day="${day}">Set Time</button></div>
      </div>
    `;
    
    daysTimeList.appendChild(wrapper);
  });
}

// Replace this block:
openBtn.onclick = () => {
  daysTimeList.innerHTML = ""; // ← REMOVE THIS
  selectedDays.forEach(day => {
    // ... create and append logic ...
  });
  modal.style.display = "block";
};

// With this:
openBtn.onclick = () => {
  renderDayTimeList();
  modal.style.display = "block";
};


  // Initial fetch and calendar setup
  fetchSavedAvailability();

  // Save availability
document.getElementById("save-availability").addEventListener("click", async () => {
  if (!isTimeConfirmed) {
    alert("Please confirm the times before saving.");
    return;
  }

  const allDaysHaveTime = selectedDays.every(day => {
    const time = dayTimes[day];
    return time && time.start && time.end;
  });

  if (!allDaysHaveTime) {
    alert("Please ensure all selected days have valid times set.");
    return;
  }

  const availability = {};
  selectedDays.forEach(day => {
    availability[day] = {
      ...dayTimes[day],
      savedAt: new Date()
    };
  });

  try {
    const scheduleRef = collection(db, "schedule");
    const snapshot = await getDocs(scheduleRef);

    const today = new Date();
    const savedDays = [];

    // Gather all currently saved day IDs (e.g., "04-23")
    snapshot.forEach(docSnap => {
      savedDays.push(docSnap.id);
    });

    // Determine days to delete: not in selectedDays or in the past
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const daysToDelete = savedDays.filter(day => {
      const [month, dayNum] = day.split("-").map(Number);
      const savedDate = new Date(today.getFullYear(), month - 1, dayNum);
      return !selectedDays.includes(day) || savedDate < todayMidnight;
    });
    

    // Delete those days
    const deletePromises = daysToDelete.map(day => deleteDoc(doc(db, "schedule", day)));

    // Save new/updated availability
    const savePromises = selectedDays.map(day => {
      const docRef = doc(db, "schedule", day);
      return setDoc(docRef, {
        availableDays: availability,
        savedAt: new Date(),
      });
    });

    await Promise.all([...deletePromises, ...savePromises]);

    alert("Availability saved!");
    document.getElementById("availability-modal").style.display = "none"; // ✅ CLOSE MODAL
  
    await fetchSavedAvailability();
  } catch (error) {
    console.error("Error saving availability:", error);
    alert("Failed to save availability.");
  }
});

});

  
  
  

// Modal logic
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("availability-modal");
  const openBtn = document.getElementById("open-availability-modal");
 

  openBtn.onclick = () => {
    modal.style.display = "block";
  };
 

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});



const modal = document.getElementById("time-modal");
const openBtn = document.getElementById("open-modal");
const closeBtn = document.querySelector(".close");
const daysTimeList = document.getElementById("days-time-list");

// Store times for each day
 

openBtn.onclick = () => {
  daysTimeList.innerHTML = ""; // Clear previous entries
  selectedDays.forEach(day => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("day-entry");

    wrapper.innerHTML = `
    <div style="display: flex; align-items: center; width: 100%; gap: 10px;">
      <div style="flex: 1;"><strong>${day}</strong></div>
      <div class="time-display" style="flex: 1; width: 100px;">${dayTimes[day]?.start || "--:--"} - ${dayTimes[day]?.end || "--:--"}</div>
      <div style="flex: 1;"><button class="time-availability select-time-btn" data-day="${day}">Set Time</button></div>
    </div>
  `;
  
  

    daysTimeList.appendChild(wrapper);
  });

  modal.style.display = "block";
};

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


let selectedDayForEdit = "";

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("select-time-btn")) {
    selectedDayForEdit = e.target.getAttribute("data-day");

    // Open select-timing modal
    document.getElementById("select-timing").style.display = "block";
  }
});


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("select-time-btn")) {
    selectedDayForEdit = e.target.getAttribute("data-day");

    // Reset all dropdowns to default (00)
    document.querySelector(".start-hour").value = "00";
    document.querySelector(".start-minute").value = "00";
    document.querySelector(".end-hour").value = "00";
    document.querySelector(".end-minute").value = "00";

    // Open select-timing modal
    document.getElementById("select-timing").style.display = "block";
  }
});

document.getElementById("save-time-btn").addEventListener("click", () => {
  const startHour = parseInt(document.querySelector(".start-hour").value);
  const startMinute = parseInt(document.querySelector(".start-minute").value);
  const endHour = parseInt(document.querySelector(".end-hour").value);
  const endMinute = parseInt(document.querySelector(".end-minute").value);

  // Check for valid values
  if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
    alert("Please select a valid start and end time.");
    return;
  }

  // Compare time values
  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;

  if (endTotal <= startTotal) {
    alert("End time must be later than start time.");
    return;
  }

  const startTime = `${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`;
  const endTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
  const fullTime = `${startTime} - ${endTime}`;

  // Save to data object
  dayTimes[selectedDayForEdit] = {
    start: startTime,
    end: endTime,
  };

  // Update the time-display inside the correct day-entry
  document.querySelectorAll(".day-entry").forEach(entry => {
    const button = entry.querySelector(".select-time-btn");
    if (button && button.getAttribute("data-day") === selectedDayForEdit) {
      const timeDisplay = entry.querySelector(".time-display");
      if (timeDisplay) {
        timeDisplay.textContent = fullTime;
      }
    }
  });

  // Close modal and reset selects
  document.getElementById("select-timing").style.display = "none";
  document.querySelector(".start-hour").value = "00";
  document.querySelector(".start-minute").value = "00";
  document.querySelector(".end-hour").value = "00";
  document.querySelector(".end-minute").value = "00";
});

// Close modal and reset selects
const closeTimingModal = () => {
  document.getElementById("select-timing").style.display = "none";
  document.querySelector(".start-hour").value = "00";
  document.querySelector(".start-minute").value = "00";
  document.querySelector(".end-hour").value = "00";
  document.querySelector(".end-minute").value = "00";
};

document.querySelector(".close-select-timing").onclick = closeTimingModal;

window.addEventListener("click", (event) => {
  const timingModal = document.getElementById("select-timing");
  if (event.target === timingModal) {
    closeTimingModal();
  }
});


 
document.querySelector(".confirm-availability").addEventListener("click", () => {
  const allDaysSet = selectedDays.every(day => {
    const time = dayTimes[day];
    return time && time.start && time.end && time.start !== "--:--" && time.end !== "--:--";
  });

  if (!allDaysSet) {
    alert("Please set time for all selected days before confirming.");
    return;
  }

  isTimeConfirmed = true;
  alert("Time confirmed for all selected days!");
  document.getElementById("time-modal").style.display = "none";
});

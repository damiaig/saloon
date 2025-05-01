const form = document.getElementById("login-form");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const message = document.getElementById("message");
const togglePassword = document.getElementById("toggle-password");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Remove all whitespace, including invisible characters from both ends
  const email = emailInput.value.trim().replace(/\s+/g, "").toLowerCase();
  const password = passwordInput.value;

  console.log("Email:", `[${email}]`);
  console.log("Password:", `[${password}]`);

  // Email check is case-insensitive; password is strict
  const correctEmail = "piercingsby3@gmail.com";
  const correctPassword = "Bytheneedle2025@";

  if (email === correctEmail && password === correctPassword) {
    sessionStorage.setItem("adminCode", "9876546789876");
    window.location.href = "admin.html";
  } else {
    showMessage("Incorrect email or password!");
  }
});

function showMessage(msg) {
  message.textContent = msg;
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

// Toggle show/hide password
togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "Show Password" : "Hide Password";
});

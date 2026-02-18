// ================================
// VacciCare Home Page JS
// ================================

// 1️⃣ Check Login Status
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector(".login-btn");

  let user = localStorage.getItem("vaccicareUser");

  if (user) {
    loginBtn.textContent = "Logout";
  }

  loginBtn.addEventListener("click", function (e) {
    if (user) {
      e.preventDefault();
      localStorage.removeItem("vaccicareUser");
      alert("Logged out successfully!");
      window.location.href = "../page/login.html";
    }
  });
});


// 2️⃣ Smooth Scroll for Learn More Button
const learnBtn = document.querySelector(".secondary-btn");

if (learnBtn) {
  learnBtn.addEventListener("click", function () {
    document.querySelector(".features").scrollIntoView({
      behavior: "smooth"
    });
  });
}


// 3️⃣ Feature Card Click Animation + Navigation
const cards = document.querySelectorAll(".feature-card");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    card.style.transform = "scale(0.97)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 150);
  });
});


// 4️⃣ Welcome Message if Logged In
window.addEventListener("load", function () {
  let user = localStorage.getItem("vaccicareUser");

  if (user) {
    const heroText = document.querySelector(".overlay h1");
    heroText.textContent = "Welcome back to VacciCare 💙";
  }
});


// 5️⃣ Auto Redirect if Not Logged In (Optional)
// Uncomment if you want protected home page

/*
if (!localStorage.getItem("vaccicareUser")) {
  window.location.href = "../page/login.html";
}
*/


// 6️⃣ Simple Vaccine Reminder Popup Demo
setTimeout(() => {
  if (localStorage.getItem("vaccicareUser")) {
    alert("Reminder: Check your child's upcoming vaccine schedule");
  }
}, 4000);

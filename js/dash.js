document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       1️⃣ LOGIN PROTECTION
    ========================= */

    const clientId = localStorage.getItem("client_id");

    if (!clientId) {

        alert("Please login first!");

        // Save page to return after login
        localStorage.setItem("redirectAfterLogin", "new_dash.html");

        window.location.href = "../page/login.html";

        return;
    }

    console.log("Logged in Client ID:", clientId);

    /* =========================
       2️⃣ PROFILE ICON CLICK
    ========================= */

    // FIX: class name corrected
    const profileIcon = document.querySelector(".profile img");

    if (profileIcon) {
        profileIcon.addEventListener("click", function () {
            window.location.href = "../page/profile.html";
        });
    }

    /* =========================
       3️⃣ SIDEBAR ACTIVE LINK
    ========================= */

    const currentPage = window.location.pathname.split("/").pop();
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    sidebarLinks.forEach(link => {

        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

        link.addEventListener("click", function () {
            sidebarLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });

    });

    /* =========================
       4️⃣ CARD BUTTON EFFECT + REDIRECT
    ========================= */

    const cardButtons = document.querySelectorAll(".card button");

    cardButtons.forEach((button, index) => {

        // hover effect (existing)
        button.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.05)";
            this.style.transition = "0.2s ease";
        });

        button.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });

        // 🔥 NEW: redirect logic
        button.addEventListener("click", function () {

            if (index === 0) {
                window.location.href = "../page/new_hospital.html";
            } 
            else if (index === 1) {
                window.location.href = "../page/calender.html";
            } 
            else if (index === 2) {
                window.location.href = "../page/guideness.html";
            }

        });

    });

});
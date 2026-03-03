document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       1️⃣ LOGIN PROTECTION
    ========================= */

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first!");
        window.location.href = "../page/login.html";
        return;
    }

    /* =========================
       2️⃣ PROFILE ICON CLICK
    ========================= */

    const profileIcon = document.querySelector(".profile-icon");

    if (profileIcon) {
        profileIcon.addEventListener("click", function () {
            window.location.href = "profile.html";
        });
    }

    /* =========================
       3️⃣ SIDEBAR ACTIVE LINK
    ========================= */

    const currentPage = window.location.pathname.split("/").pop();
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    sidebarLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

        link.addEventListener("click", function () {
            sidebarLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    /* =========================
       4️⃣ CARD BUTTON EFFECT
    ========================= */

    const cardButtons = document.querySelectorAll(".card button");

    cardButtons.forEach(button => {
        button.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.05)";
            this.style.transition = "0.2s ease";
        });

        button.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    });

});
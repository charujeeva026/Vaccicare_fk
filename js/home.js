document.addEventListener("DOMContentLoaded", function () {

    const authBtn = document.getElementById("authBtn");

    /* =====================================
       LOGIN / LOGOUT BUTTON TOGGLE
    ====================================== */

    function updateAuthButton() {

        const clientId = localStorage.getItem("client_id");

        if (clientId) {

            authBtn.textContent = "Logout";

            authBtn.onclick = function () {

                localStorage.removeItem("client_id");
                localStorage.removeItem("role");
                localStorage.removeItem("redirectAfterLogin");

                alert("Logged out successfully ✅");

                window.location.href = "index.html";
            };

        } else {

            authBtn.textContent = "Login";

            authBtn.onclick = function () {
                window.location.href = "page/login.html";
            };

        }
    }

    updateAuthButton();

    /* =====================================
       PROTECTED BUTTONS & CARDS
    ====================================== */

    const protectedItems = document.querySelectorAll(
        ".protected-card, .protected-btn"
    );

    protectedItems.forEach(item => {

        item.addEventListener("click", function () {

            const clientId = localStorage.getItem("client_id");
            const targetPage = this.getAttribute("data-page");

            if (!clientId) {

                alert("Please login first!");

                // Save page to redirect after login
                localStorage.setItem("redirectAfterLogin", targetPage);

                window.location.href = "page/login.html";

            } else {

                window.location.href = targetPage;

            }

        });

    });

});
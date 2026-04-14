document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your Public Key
  emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY", // Substitute with your actual Public Key
  });

  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    // Prepare template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    // Send email using EmailJS
    emailjs.send("service_dgoga76", "YOUR_TEMPLATE_ID", templateParams)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Message sent successfully!");
        form.reset();
      }, function (error) {
        console.log("FAILED...", error);
        alert("Failed to send message: " + JSON.stringify(error));
      });
  });
});
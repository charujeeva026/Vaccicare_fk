/* ================= CONFIG ================= */
const BASE_URL = "http://127.0.0.1:8000";

/* ================= ELEMENTS ================= */
const clientBtn = document.getElementById("clientBtn");
const doctorBtn = document.getElementById("doctorBtn");
const switchMode = document.getElementById("switchMode");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.querySelector(".submit-btn");

const clientFields = document.getElementById("clientFields");
const doctorFields = document.getElementById("doctorFields");
const hospitalSelect = document.getElementById("hospital_select");
const form = document.getElementById("authForm");

/* inputs */
const email = document.getElementById("email");
const password = document.getElementById("password");

const client_name = document.getElementById("client_name");
const client_phone = document.getElementById("client_phone");
const client_address = document.getElementById("client_address");
const client_location = document.getElementById("client_location");

const doctor_name = document.getElementById("doctor_name");
const doctor_phone = document.getElementById("doctor_phone");
const doctor_role = document.getElementById("doctor_role");
const doctor_address = document.getElementById("doctor_address");

/* ================= STATE ================= */
let role = "Client";
let isLogin = true;

/* ================= ROLE SWITCH ================= */
clientBtn.onclick = () => {
  role = "Client";
  clientBtn.classList.add("active");
  doctorBtn.classList.remove("active");
  updateForm();
};

doctorBtn.onclick = () => {
  role = "Doctor";
  doctorBtn.classList.add("active");
  clientBtn.classList.remove("active");
  updateForm();
};

/* ================= LOGIN / SIGNUP SWITCH ================= */
switchMode.onclick = () => {
  isLogin = !isLogin;
  updateForm();
};

/* ================= UPDATE FORM ================= */
function updateForm() {
  formTitle.innerText = `${role} ${isLogin ? "Login" : "Signup"}`;
  submitBtn.innerText = isLogin ? "Sign In" : "Create Account";
  switchMode.innerText = isLogin ? "Create one" : "Sign in";

  clientFields.classList.add("hidden");
  doctorFields.classList.add("hidden");

  if (!isLogin) {
    if (role === "Client") {
      clientFields.classList.remove("hidden");
    } else {
      doctorFields.classList.remove("hidden");
    }
  }
}

/* ================= LOAD HOSPITALS ================= */
async function loadHospitals() {
  try {
    const res = await fetch(`${BASE_URL}/hospital/home`);
    if (!res.ok) throw new Error("Failed to fetch hospitals");

    const data = await res.json();
    const hospitals = Array.isArray(data) ? data : [data];

    hospitalSelect.innerHTML = `<option value="">Select Hospital</option>`;

    hospitals.forEach(h => {
      const option = document.createElement("option");
      option.value = h.id;
      option.textContent = h.hospital_name;
      hospitalSelect.appendChild(option);
    });

  } catch (err) {
    console.error("Hospital load error ❌", err);
  }
}

/* ================= SUBMIT ================= */
form.onsubmit = async (e) => {
  e.preventDefault();

  if (!email.value || !password.value) {
    alert("Email and Password required ❌");
    return;
  }

  if (password.value.length < 6) {
    alert("Password must be at least 6 characters ❌");
    return;
  }

  /* ================= LOGIN ================= */
  if (isLogin) {
    const payload = {
      email: email.value.trim(),
      password: password.value.trim()
    };

    const url =
      role === "Client"
        ? `${BASE_URL}/client/login`
        : `${BASE_URL}/doctor/login`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Login failed ❌");
        return;
      }

      /* ===== SAVE TOKEN ===== */
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", role);

      alert("Login successful ✅");

      /* ===== REDIRECT LOGIC ===== */
      const redirectPage = localStorage.getItem("redirectAfterLogin");

      if (redirectPage) {
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = "../" + redirectPage;
      } else {
        window.location.href = "dash.html";
      }

    } catch {
      alert("Server not reachable ❌");
    }

    return;
  }

  /* ================= CLIENT SIGNUP ================= */
  if (role === "Client") {
    const payload = {
      name: client_name.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
      phone_no: client_phone.value.trim(),
      address: client_address.value.trim(),
      location: client_location.value.trim()
    };

    try {
      const res = await fetch(`${BASE_URL}/client/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error();

      alert("Client created successfully ✅");
      form.reset();
      isLogin = true;
      updateForm();

    } catch {
      alert("Client creation failed ❌");
    }
  }

  /* ================= DOCTOR SIGNUP ================= */
  if (role === "Doctor") {

    if (!hospitalSelect.value) {
      alert("Please select hospital ❌");
      return;
    }

    const payload = {
      name: doctor_name.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
      phone_no: doctor_phone.value.trim(),
      role: doctor_role.value.trim(),
      address: doctor_address.value.trim(),
      hospital_id: parseInt(hospitalSelect.value)
    };

    try {
      const res = await fetch(`${BASE_URL}/doctor/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error();

      alert("Doctor created successfully ✅");
      form.reset();
      isLogin = true;
      updateForm();

    } catch {
      alert("Doctor creation failed ❌");
    }
  }
};

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  updateForm();
  loadHospitals();
});
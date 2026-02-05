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
let role = "Client";   // Client | Doctor
let isLogin = true;    // true = login, false = signup

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
    role === "Client"
      ? clientFields.classList.remove("hidden")
      : doctorFields.classList.remove("hidden");
  }
}

/* ================= LOAD HOSPITALS ================= */
async function loadHospitals() {
  try {
    const res = await fetch("http://127.0.0.1:8000/hospital/home");
    const hospitals = await res.json();

    hospitalSelect.innerHTML = `<option value="">Select Hospital</option>`;

    hospitals.forEach(h => {
      const opt = document.createElement("option");
      opt.value = h.id;
      opt.textContent = h.hospital_name;
      hospitalSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Hospital load error ❌", err);
  }
}

/* ================= SUBMIT ================= */
form.onsubmit = async (e) => {
  e.preventDefault();

  /* ---------- LOGIN ---------- */
  if (isLogin) {
    const payload = {
      email: email.value,
      password: password.value
    };

    const url =
      role === "Client"
        ? "http://127.0.0.1:8000/client/login"
        : "http://127.0.0.1:8000/doctor/login";

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

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", role);

      alert("Login successful ✅");

      window.location.href =
        role === "Client"
          ? "/client/dashboard.html"
          : "/doctor/dashboard.html";

    } catch {
      alert("Server not reachable ❌");
    }

    return;
  }

  /* ---------- CLIENT SIGNUP ---------- */
  if (role === "Client") {
    const payload = {
      name: client_name.value,
      email: email.value,
      password: password.value,
      phone_no: client_phone.value,
      address: client_address.value,
      location: client_location.value
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/client/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        alert("Client creation failed ❌");
        return;
      }

      alert("Client created successfully ✅");
      form.reset();
      isLogin = true;
      updateForm();

    } catch {
      alert("Backend not reachable ❌");
    }
  }

  /* ---------- DOCTOR SIGNUP ---------- */
  if (role === "Doctor") {
    if (!hospitalSelect.value) {
      alert("Please select hospital ❌");
      return;
    }

    const payload = {
      name: doctor_name.value,
      email: email.value,
      password: password.value,
      phone_no: doctor_phone.value,
      role: doctor_role.value,
      address: doctor_address.value,
      hospital_id: parseInt(hospitalSelect.value)
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/doctor/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        alert("Doctor creation failed ❌");
        return;
      }

      alert("Doctor created successfully ✅");
      form.reset();
      isLogin = true;
      updateForm();

    } catch {
      alert("Backend not reachable ❌");
    }
  }
};

/* ================= INIT ================= */
updateForm();
loadHospitals();

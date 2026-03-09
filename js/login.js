const BASE_URL = "http://127.0.0.1:8000";

/* ELEMENTS */

const clientBtn = document.getElementById("clientBtn");
const doctorBtn = document.getElementById("doctorBtn");
const switchMode = document.getElementById("switchMode");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.querySelector(".submit-btn");

const clientFields = document.getElementById("clientFields");
const doctorFields = document.getElementById("doctorFields");
const hospitalSelect = document.getElementById("hospital_select");
const form = document.getElementById("authForm");

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

let role = "Client";
let isLogin = true;

/* ROLE SWITCH */

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

switchMode.onclick = () => {
  isLogin = !isLogin;
  updateForm();
};

function updateForm() {

  formTitle.innerText = `${role} ${isLogin ? "Login" : "Signup"}`;
  submitBtn.innerText = isLogin ? "Sign In" : "Create Account";
  switchMode.innerText = isLogin ? "Create one" : "Sign in";

  clientFields.classList.add("hidden");
  doctorFields.classList.add("hidden");

  if (!isLogin) {
    if (role === "Client") clientFields.classList.remove("hidden");
    if (role === "Doctor") doctorFields.classList.remove("hidden");
  }

}

/* LOGIN / SIGNUP */

form.onsubmit = async (e) => {

  e.preventDefault();

  if (!email.value.trim() || !password.value.trim()) {
    alert("Email and Password required");
    return;
  }

  if (isLogin) {

    const payload = {
      email: email.value.trim(),
      password: password.value.trim()
    };

    const url = role === "Client"
      ? `${BASE_URL}/client/login`
      : `${BASE_URL}/doctor/login`;

    try {

      const res = await fetch(url,{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(payload)
      });

      const data = await res.json();

      if(!res.ok){
        alert(data.detail || "Login failed");
        return;
      }

      localStorage.clear();

      localStorage.setItem("role",role);

      if(role==="Client"){
        localStorage.setItem("client_id",data.client_id);
        localStorage.setItem("client_email",email.value.trim());
      }

      alert("Login successful");

      window.location.href="../page/new_dash.html";

    } catch {
      alert("Server not reachable");
    }

    return;
  }

  /* CLIENT SIGNUP */

  if(role==="Client"){

    const payload={
      name:client_name.value.trim(),
      email:email.value.trim(),
      password:password.value.trim(),
      phone_no:client_phone.value.trim(),
      address:client_address.value.trim(),
      location:client_location.value.trim()
    };

    const res = await fetch(`${BASE_URL}/client/create`,{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify(payload)
    });

    if(res.ok){
      alert("Client created successfully");
      form.reset();
      isLogin=true;
      updateForm();
    }else{
      alert("Signup failed");
    }

  }

};
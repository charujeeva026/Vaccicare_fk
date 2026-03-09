// ================= GET ELEMENTS =================
const form = document.querySelector("form");
const doctorSelect = document.getElementById("doctor");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");

// ================= GET HOSPITAL ID =================
const urlParams = new URLSearchParams(window.location.search);
const hospitalId = urlParams.get("hospital_id");

console.log("Hospital ID:", hospitalId);

// ================= LOAD DOCTORS =================
async function loadDoctors() {

  if (!hospitalId) {
    console.log("Hospital ID not found in URL");
    return;
  }

  try {

    const response = await fetch(`http://127.0.0.1:8000/doctor/hospital/${hospitalId}`);
    const doctors = await response.json();

    console.log("Doctors received:", doctors);

    doctorSelect.innerHTML = `<option value="">-- Select Doctor --</option>`;

    if (doctors.length === 0) {

      const option = document.createElement("option");
      option.textContent = "No doctors available";
      option.disabled = true;

      doctorSelect.appendChild(option);
      return;
    }

    doctors.forEach(doc => {

      const option = document.createElement("option");

      option.value = doc.id;
      option.textContent = doc.doctor_name;   // ✅ FIXED

      doctorSelect.appendChild(option);

    });

  } catch (error) {

    console.error("Doctor loading error:", error);

  }

}

loadDoctors();


// ================= DISABLE PAST DATE =================
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);


// ================= BOOK APPOINTMENT =================
form.addEventListener("submit", async function (e) {

  e.preventDefault();

  const doctor_id = doctorSelect.value;
  const date = dateInput.value;
  const time = timeInput.value;

  if (!doctor_id || !date || !time) {
    alert("Please fill all fields");
    return;
  }

  const selectedDateTime = new Date(`${date}T${time}`);
  const now = new Date();

  if (selectedDateTime < now) {
    alert("Past date/time not allowed ❌");
    return;
  }

  const client_id = 1; // temporary

  const data = {
    client_id,
    doctor_id,
    appointment_date: date,
    appointment_time: time
  };

  try {

    const response = await fetch("http://127.0.0.1:8000/appointment/create", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)

    });

    if (!response.ok) {
      throw new Error("Booking failed");
    }

    const result = await response.json();

    console.log("Appointment result:", result);

    alert("Appointment booked successfully 🎉");

    form.reset();

  } catch (error) {

    console.error("Booking error:", error);

    alert("Booking failed ❌");

  }

});
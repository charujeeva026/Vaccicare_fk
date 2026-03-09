const hospitalContainer = document.getElementById("hospitalList");
const nearbyContainer = document.getElementById("nearbyHospitals");
const searchInput = document.getElementById("searchHospital");

let hospitals = [];


// ================= LOAD HOSPITALS =================

async function loadHospitals(){

    try{

        const response = await fetch("http://127.0.0.1:8000/hospital/home");
        const data = await response.json();

        hospitals = data;

        displayHospitals(hospitals.slice(0,3)); // show only 3 initially
        displayNearbyHospitals(hospitals); // show all on right

    }catch(error){

        console.log("Error loading hospitals:",error);

    }

}

loadHospitals();


// ================= DISPLAY MAIN CARDS =================

function displayHospitals(data){

    hospitalContainer.innerHTML = "";

    data.forEach(hospital => {

        const card = `
        <div class="card">

        <img src="https://media.gettyimages.com/id/182344359/photo/hospital.jpg?s=612x612&w=gi&k=20&c=ZRBwQkDUDNaHUEJmcAonowN1gZuec5NQLOS0MS-sEU8=">

        <div class="card-content">
        <h3>${hospital.hospital_name}</h3>
        <p>${hospital.address}</p>
        <span>${hospital.distance} km</span>
        </div>

        <button class="contact-btn" onclick="goToAppointment(${hospital.id})">
        Contact
        </button>

        </div>
        `;

        hospitalContainer.innerHTML += card;

    });

}


// ================= DISPLAY RIGHT SIDE HOSPITALS =================

function displayNearbyHospitals(data){

    nearbyContainer.innerHTML = "";

    data.forEach(hospital => {

        const item = `
        <div class="near-item">

        <img src="https://thumbs.dreamstime.com/b/modern-style-hospital-building-straight-lines-concrete-facing-30588884.jpg">

        <div class="near-details">
        <p>${hospital.hospital_name}</p>
        <span>${hospital.address} • ${hospital.distance} km</span>
        </div>

        <button class="small-contact" onclick="goToAppointment(${hospital.id})">
        Contact
        </button>

        </div>
        `;

        nearbyContainer.innerHTML += item;

    });

}


// ================= SEARCH =================

searchInput.addEventListener("keyup", function(){

    const value = searchInput.value.toLowerCase();

    if(value === ""){

        displayHospitals(hospitals.slice(0,3));
        return;

    }

    const filtered = hospitals.filter(hospital =>

        hospital.hospital_name.toLowerCase().includes(value) ||
        hospital.address.toLowerCase().includes(value)

    );

    displayHospitals(filtered);

});


// ================= REDIRECT =================

function goToAppointment(id){

    window.location.href = `/page/appointment.html?hospital_id=${id}`;

}


// ================= EMERGENCY =================

function callEmergency(){

    alert("Calling Emergency 108 🚑");
    window.location.href = "tel:108";

}
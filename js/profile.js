const API_BASE = "https://vaccicare-bk.vercel.app/client";

const nameEl = document.querySelector(".profile-info h3");
const emailEl = document.querySelector(".profile-info p:nth-child(2)");
const phoneEl = document.querySelector(".profile-info p:nth-child(3)");
const locationEl = document.querySelector(".profile-info p:nth-child(4)");

const editBtn = document.querySelector(".edit-btn");
const logoutBtn = document.querySelector(".logout-btn");

const clientId = localStorage.getItem("client_id");

/* LOAD PROFILE */
async function loadProfile(){

if(!clientId){
alert("Please login first");
window.location.href="../login.html";
return;
}

const res = await fetch(`${API_BASE}/profile/${clientId}`);
const data = await res.json();

nameEl.textContent = data.name;
emailEl.innerHTML = "<strong>Email:</strong> " + data.email;
phoneEl.innerHTML = "<strong>Phone:</strong> " + data.phone_no;
locationEl.innerHTML = "<strong>Location:</strong> " + data.location;

}

loadProfile();

/* EDIT PROFILE */
editBtn.addEventListener("click", async ()=>{

const phone = prompt("Enter Phone Number");
const location = prompt("Enter Location");
const address = prompt("Enter Address");

const res = await fetch(`${API_BASE}/update/${clientId}`,{

method:"PUT",
headers:{ "Content-Type":"application/json"},

body:JSON.stringify({
phone_no: phone,
location: location,
address: address
})

});

if(res.ok){
alert("Profile Updated");
loadProfile();
}

});

/* DELETE PROFILE */
async function deleteProfile(){

const confirmDelete = confirm("Delete your account?");

if(!confirmDelete) return;

await fetch(`${API_BASE}/delete/${clientId}`,{
method:"DELETE"
});

localStorage.clear();

alert("Account deleted");

window.location.href="../login.html";

}

/* LOGOUT */
logoutBtn.addEventListener("click",()=>{

localStorage.clear();
window.location.href="../login.html";

});
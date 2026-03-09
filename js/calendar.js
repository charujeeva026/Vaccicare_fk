document.addEventListener("DOMContentLoaded",async function(){

const vaccineSelect=document.getElementById("vaccineSelect");
const vaccineNameInput=document.getElementById("vaccineName");
const vaccineDate=document.getElementById("vaccineDate");
const setReminderBtn=document.getElementById("setReminderBtn");
const reminderTable=document.getElementById("reminderTable");

const client_id=localStorage.getItem("client_id");

/* LOAD VACCINES */

async function loadVaccines(){

const res=await fetch("http://127.0.0.1:8000/vaccine/home");
const vaccines=await res.json();

vaccineSelect.innerHTML=`<option value="">Select Vaccine</option>`;

vaccines.forEach(v=>{
const option=document.createElement("option");
option.value=v.vaccine_name;
option.textContent=v.vaccine_name;
vaccineSelect.appendChild(option);
});

}

vaccineSelect.addEventListener("change",()=>{
vaccineNameInput.value=vaccineSelect.value;
});

/* SET REMINDER */

setReminderBtn.addEventListener("click",async ()=>{

const vaccine_name=vaccineNameInput.value.trim();
const date=vaccineDate.value;

if(!vaccine_name || !date){
alert("Select vaccine and date");
return;
}

const day=new Date(date).toLocaleDateString("en-US",{weekday:"long"});

const payload={
client_id:client_id,
vaccine_name:vaccine_name,
date:date,
day:day
};

const res=await fetch("http://127.0.0.1:8000/reminder/create",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(payload)
});

if(res.ok){
alert("Reminder added 💉");
loadReminders();
}

});

/* LOAD REMINDERS */

async function loadReminders(){

const res=await fetch("http://127.0.0.1:8000/reminder/home");
const data=await res.json();

const myReminders=data.filter(r=>r.client_id==client_id);

reminderTable.innerHTML="";

myReminders.forEach(r=>{

const row=document.createElement("tr");

row.innerHTML=`
<td>${r.vaccine_name}</td>
<td>${r.date}</td>
<td>${r.day}</td>
`;

reminderTable.appendChild(row);

});

}

await loadVaccines();
await loadReminders();

});
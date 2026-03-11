const container=document.getElementById("vaccineContainer");

const client_id=localStorage.getItem("client_id");
const clientEmail=localStorage.getItem("client_email");

function formatDate(dateStr){

const d=new Date(dateStr+"T00:00:00");

const day=String(d.getDate()).padStart(2,"0");
const month=String(d.getMonth()+1).padStart(2,"0");
const year=d.getFullYear();

return `${day}/${month}/${year}`;
}

/* EMAIL */

function sendReminderEmail(email,vaccine,date){

emailjs.send("service_pdalwp1","template_iqnnp7y",{
to_email:email,
vaccine:vaccine,
date:date
});

}

/* CHECK REMINDER */

function checkReminder(date,email,vaccine,id){

let today=new Date();
let vDate=new Date(date);

today.setHours(0,0,0,0);
vDate.setHours(0,0,0,0);

let diff=Math.floor((vDate-today)/(1000*60*60*24));

let key7=`r7_${id}`;
let key1=`r1_${id}`;

if(diff===7 && !localStorage.getItem(key7)){
sendReminderEmail(email,vaccine,date);
localStorage.setItem(key7,"sent");
}

if(diff===1 && !localStorage.getItem(key1)){
sendReminderEmail(email,vaccine,date);
localStorage.setItem(key1,"sent");
}

}

/* LOAD RECORDS */

async function loadVaccines(){

const res=await fetch("https://vaccicare-bk.vercel.app/reminder/home");
const data=await res.json();

const my=data.filter(r=>r.client_id==client_id);

container.innerHTML="";

if(my.length===0){

container.innerHTML=`
<div class="no-vaccine">
<p>No vaccines scheduled yet 💉</p>
</div>
`;

return;
}

my.forEach(r=>{

checkReminder(r.date,clientEmail,r.vaccine_name,r.id);

const today=new Date();
const recDate=new Date(r.date);

const statusClass=recDate<today?"done":"pending";
const statusText=statusClass==="done"?"Completed":"Not Completed";

const card=`
<div class="info-box vaccine-box">

<div class="vaccine-left">
<h3>${r.vaccine_name}</h3>
</div>

<div class="vaccine-middle">
<p>${formatDate(r.date)}</p>
</div>

<div class="vaccine-right">
<button class="status-btn ${statusClass}">
${statusText}
</button>
</div>

</div>
`;

container.innerHTML+=card;

});

}

loadVaccines();

setInterval(loadVaccines,10000);
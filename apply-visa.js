import { auth, db, storage } from "./firebase-config.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


const form = document.getElementById("visaForm");


onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";
return;

}


form.addEventListener("submit",async(e)=>{

e.preventDefault();


try{


alert("Application Uploading Please Wait...");


// Upload File Function

async function uploadFile(id){

const fileInput = document.getElementById(id);

if(fileInput && fileInput.files.length > 0){

const file = fileInput.files[0];

const storageRef = ref(
storage,
"visaDocuments/" + user.uid + "/" + file.name
);


await uploadBytes(storageRef,file);


return await getDownloadURL(storageRef);

}

return "";

}


// Upload Documents

const passportURL = await uploadFile("passportFile");

const cnicFrontURL = await uploadFile("cnicFront");

const cnicBackURL = await uploadFile("cnicBack");

const photoURL = await uploadFile("photo");

const bankURL = await uploadFile("bankStatement");

const jobURL = await uploadFile("jobLetter");



// Save Application


await addDoc(collection(db,"applications"),{


uid:user.uid,

email:user.email,


fullName:document.getElementById("fullName").value,

fatherName:document.getElementById("fatherName").value,

phone:document.getElementById("phone").value,

whatsapp:document.getElementById("whatsapp").value,

cnic:document.getElementById("cnic").value,


dob:document.getElementById("dob").value,

gender:document.getElementById("gender").value,


passport:document.getElementById("passport").value,

passportIssue:document.getElementById("passportIssue").value,

passportExpiry:document.getElementById("passportExpiry").value,


nationality:document.getElementById("nationality").value,

maritalStatus:document.getElementById("maritalStatus").value,


occupation:document.getElementById("occupation").value,

income:document.getElementById("income").value,


address:document.getElementById("address").value,

city:document.getElementById("city").value,


country:document.getElementById("country").value,

visaType:document.getElementById("visaType").value,


travelDate:document.getElementById("travelDate").value,

returnDate:document.getElementById("returnDate").value,


notes:document.getElementById("notes").value,


documents:{

passport:passportURL,

cnicFront:cnicFrontURL,

cnicBack:cnicBackURL,

photo:photoURL,

bankStatement:bankURL,

jobLetter:jobURL

},


status:"Pending",

createdAt:serverTimestamp()


});


alert("✅ Visa Application Successfully Submitted");


window.location.href="dashboard.html";


}

catch(error){

console.log(error);

alert(error.message);

}


});


});
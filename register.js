import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const cnic = document.getElementById("cnic").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {

            uid: user.uid,

            fullName: fullName,

            email: email,

            phone: phone,

            cnic: cnic,

            role: "user",

            approved: false,

            accountStatus: "Pending",

            createdAt: serverTimestamp()

        });

        alert(
            "آپ کا اکاؤنٹ کامیابی سے بن گیا ہے۔\n\nاب Admin Approval کے بعد ہی آپ Login کر سکیں گے۔"
        );

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

        console.error(error);

    }

});
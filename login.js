import { auth, db } from "./firebase-config.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter Email and Password.");
        return;
    }

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {

            alert("User record not found.");
            return;

        }

        const userData = userSnap.data();

        // Admin Login
        if (userData.role === "admin") {

            alert("Welcome Admin");

            window.location.href = "admin.html";

            return;

        }

        // Normal User Login (No Approval Required)

        alert("Login Successful");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});
import { auth, db } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const accountStatus = document.getElementById("accountStatus");

const totalApplications = document.getElementById("totalApplications");
const pendingApplications = document.getElementById("pendingApplications");
const approvedApplications = document.getElementById("approvedApplications");

const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    userEmail.textContent = user.email;

    try {

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const data = userSnap.data();

            userName.textContent = data.fullName || "User";

            if (data.approved === true) {

                accountStatus.textContent = "Approved";
                accountStatus.style.color = "green";

            } else {

                accountStatus.textContent = "Pending Approval";
                accountStatus.style.color = "orange";

            }

            totalApplications.textContent = "0";
                      pendingApplications.textContent = "0";
            approvedApplications.textContent = "0";

        } else {

            userName.textContent = "User";
            accountStatus.textContent = "Account Not Found";
            accountStatus.style.color = "red";

            totalApplications.textContent = "0";
            pendingApplications.textContent = "0";
            approvedApplications.textContent = "0";
        }

    } catch (error) {

        console.error(error);

        accountStatus.textContent = "Error Loading";
        accountStatus.style.color = "red";

        alert("Unable to load dashboard.");
    }

});

logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        alert("Logged Out Successfully");

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }

});
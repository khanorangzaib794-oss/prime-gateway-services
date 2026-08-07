import { auth, db } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const usersList = document.getElementById("usersList");
const applicationsList = document.getElementById("applicationsList");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    try {

        const adminRef = doc(db, "users", user.uid);

        const adminSnap = await getDoc(adminRef);

        if (!adminSnap.exists()) {

            alert("Admin Record Not Found");

            window.location.href = "login.html";

            return;

        }

        const adminData = adminSnap.data();

        if (adminData.role !== "admin") {

            alert("Access Denied");

            window.location.href = "dashboard.html";

            return;

        }

        loadUsers();
        loadApplications();

    } catch (error) {

        console.log(error);

    }

});

async function loadUsers() {

    usersList.innerHTML = "<p>Loading Users...</p>";

    const snapshot = await getDocs(collection(db, "users"));

    if (snapshot.empty) {

        usersList.innerHTML = "<p>No Users Found.</p>";

        return;

    }

    usersList.innerHTML = "";

    snapshot.forEach((userDoc) => {

        const data = userDoc.data();

        usersList.innerHTML += `

        <div class="applications-card">

        <h3>${data.fullName}</h3>

        <p>Email : ${data.email}</p>

        <p>Phone : ${data.phone}</p>

        <p>CNIC : ${data.cnic}</p>

        <p>

        Status :

        <span id="user-status-${userDoc.id}">

        ${data.accountStatus}

        </span>

        </p>

        <button

        class="primary-btn approveUser"

        data-id="${userDoc.id}">

        Approve

        </button>

        <button

        class="primary-btn rejectUser"

        data-id="${userDoc.id}">

        Reject

        </button>

        </div>

        <br>

        `;

    });

    document.querySelectorAll(".approveUser").forEach(btn => {

        btn.addEventListener("click", async () => {

            await updateDoc(doc(db, "users", btn.dataset.id), {

                approved: true,

                accountStatus: "Approved"

            });

            document.getElementById(
                "user-status-" + btn.dataset.id
            ).textContent = "Approved";

            alert("User Approved");

        });

    });

    document.querySelectorAll(".rejectUser").forEach(btn => {

        btn.addEventListener("click", async () => {

            await updateDoc(doc(db, "users", btn.dataset.id), {

                approved: false,

                accountStatus: "Rejected"

            });

            document.getElementById(
                "user-status-" + btn.dataset.id
            ).textContent = "Rejected";

            alert("User Rejected");

        });

    });

}
async function loadApplications() {

    applicationsList.innerHTML = "<p>Loading Applications...</p>";

    const snapshot = await getDocs(collection(db, "applications"));

    if (snapshot.empty) {

        applicationsList.innerHTML = "<p>No Applications Found.</p>";

        return;

    }

    applicationsList.innerHTML = "";

    snapshot.forEach((appDoc) => {

        const data = appDoc.data();

        applicationsList.innerHTML += `

        <div class="applications-card">

        <h3>${data.fullName}</h3>

        <p>Email : ${data.email}</p>

        <p>Passport : ${data.passport}</p>

        <p>Country : ${data.country}</p>

        <p>Visa Type : ${data.visaType}</p>

        <p>

        Status :

        <span id="app-status-${appDoc.id}">

        ${data.status}

        </span>

        </p>

        <button
        class="primary-btn approveVisa"
        data-id="${appDoc.id}">
        Approve Visa
        </button>

        <button
        class="primary-btn rejectVisa"
        data-id="${appDoc.id}">
        Reject Visa
        </button>

        </div>

        <br>

        `;

    });

    document.querySelectorAll(".approveVisa").forEach(btn => {

        btn.addEventListener("click", async () => {

            await updateDoc(doc(db, "applications", btn.dataset.id), {

                status: "Approved"

            });

            document.getElementById(
                "app-status-" + btn.dataset.id
            ).textContent = "Approved";

            alert("Visa Approved");

        });

    });

    document.querySelectorAll(".rejectVisa").forEach(btn => {

        btn.addEventListener("click", async () => {

            await updateDoc(doc(db, "applications", btn.dataset.id), {

                status: "Rejected"

            });

            document.getElementById(
                "app-status-" + btn.dataset.id
            ).textContent = "Rejected";

            alert("Visa Rejected");

        });

    });

}

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

});
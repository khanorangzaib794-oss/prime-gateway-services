// Firebase SDK Imports

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


// Firebase Config

const firebaseConfig = {

apiKey: "AIzaSyBUTL4YQEAQFgYj-jpQhGi_wVjyCt1KSXI",

authDomain: "prime-gateway-service-87975.firebaseapp.com",

projectId: "prime-gateway-service-87975",

storageBucket: "prime-gateway-service-87975.appspot.com",

messagingSenderId: "124370752073",

appId: "1:124370752073:web:9a37a1f76b0387f4cfe598"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Export Firebase Services

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
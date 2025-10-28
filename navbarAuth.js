// navbarAuth.js

import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const profileIcon = document.getElementById("profileIcon");
const logoutMenu = document.getElementById("logoutMenu");
const logoutBtn = document.getElementById("logoutBtn");

let isLoggedIn = false; // 👉 নতুন ভ্যারিয়েবল, লগইন অবস্থা ট্র্যাক রাখতে

// 🔹 ইউজার স্টেট মনিটর
onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn = true;
    loginBtn.style.display = "none";
    profileIcon.style.display = "inline-block";
    if (logoutMenu) logoutMenu.classList.add("hidden");
  } else {
    isLoggedIn = false;
    loginBtn.style.display = "inline-block";
    profileIcon.style.display = "inline-block"; // চাইলে hide করতে পার
    if (logoutMenu) logoutMenu.classList.add("hidden");
  }
});

// 🔹 Profile‑এ ক্লিক করলে শুধু লগইন অবস্থায় মেনু টগল হবে
if (profileIcon) {
  profileIcon.addEventListener("click", (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      // লগআউট অবস্থায় কিছু হবে না, বরং register পেজে নিতে চাও?
      // window.location = "register.html";
      return;
    }

    logoutMenu.classList.toggle("hidden");
  });
}

// 🔹 Logout বোতামে ক্লিক
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        window.location = "index.html";
      })
      .catch((error) => alert("❌ " + error.message));
  });
}
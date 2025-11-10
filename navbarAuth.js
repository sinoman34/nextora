// navbarAuth.js

import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const profileIcon = document.getElementById("profileIcon");

// ইউজার স্টেট অনুযায়ী profile icon দেখানো
onAuthStateChanged(auth, (user) => {
  if (user) {
    // user logged in → profile icon দেখাবে
    if (profileIcon) profileIcon.style.display = "inline-block";
  } else {
    // no user logged in → profile icon দেখাবে
    if (profileIcon) profileIcon.style.display = "inline-block";
  }
});

// Profile icon ক্লিক করলে সরাসরি profile page
if (profileIcon) {
  profileIcon.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "profile.html";
  });
}


// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

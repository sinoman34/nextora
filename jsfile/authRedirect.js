// ⭐ authRedirect.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// 🔹 তোমার Firebase config (firebase.js-এর টা)
const firebaseConfig = {
  apiKey: "AIzaSyAcovYL8VyaStebGBH7VfMY6tNbEuDiP5U",
  authDomain: "nextora-shop.firebaseapp.com",
  projectId: "nextora-shop",
  storageBucket: "nextora-shop.firebasestorage.app",
  messagingSenderId: "1095626061183",
  appId: "1:1095626061183:web:e9f60b619503d70c49164a",
  measurementId: "G-J66VVKEHRL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 কমন function → checks login each time button is clicked
export function checkAuthAndRedirect(targetPageIfLoggedIn, targetPageIfNotLoggedIn) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // user logged in
      window.location.href = targetPageIfLoggedIn;
    } else {
      // user not logged
      window.location.href = targetPageIfNotLoggedIn;
    }
  });
}
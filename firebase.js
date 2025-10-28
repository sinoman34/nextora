// ✅ Import necessary Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// 🔧 তোমার Firebase project config (exactly যেটা console থেকে পেয়েছো)
const firebaseConfig = {
  apiKey: "AIzaSyAcovYL8VyaStebGBH7VfMY6tNbEuDiP5U",
  authDomain: "nextora-shop.firebaseapp.com",
  projectId: "nextora-shop",
  storageBucket: "nextora-shop.firebasestorage.app",
  messagingSenderId: "1095626061183",
  appId: "1:1095626061183:web:e9f60b619503d70c49164a",
  measurementId: "G-J66VVKEHRL"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export auth & db handles
export const auth = getAuth(app);
export const db = getFirestore(app);
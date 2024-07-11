import { auth } from "../js/firebase.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
    // User is signed out
    // ...
    window.location.href = "../login";
  }
});

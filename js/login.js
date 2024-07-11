import { auth, firestore } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log(1)

function createUser(username, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // TODO add user to database with username and other stuff
        const docRef = doc(firestore, `public`, user.uid);
        await setDoc(docRef, {
          
          username: username
          
        })
        
        
        .then(() => {
          // Update successful
          console.log("Updated profile");
        })
        
        const usernamesDoc = doc(firestore, 'usernames', username)
        await setDoc(usernamesDoc, {
          
          uid: user.uid
          
        }, {merge:true})
        
        window.location.href = "../"
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Sign Up Error: " + errorMessage)
      });
}

function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        window.location.href = "../";
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Login Error: " + errorMessage)
      });
}


const loginButton = document.getElementById("login");
const signupButton = document.getElementById("signup");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginButton.addEventListener("click", () => {
  loginUser(emailInput.value, passwordInput.value)
})

signupButton.addEventListener("click", () => {
  createUser(usernameInput.value, emailInput.value, passwordInput.value)
})

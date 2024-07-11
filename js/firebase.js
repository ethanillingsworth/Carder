import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDXpc3wocToriD1AArUX2ZWvuaHm98lzRc",
  authDomain: "carder-collecting.firebaseapp.com",
  databaseURL: "https://carder-collecting-default-rtdb.firebaseio.com",
  projectId: "carder-collecting",
  storageBucket: "carder-collecting.appspot.com",
  messagingSenderId: "660910059647",
  appId: "1:660910059647:web:3328ab7e095f7e9f444f4a",
  measurementId: "G-M3DCP2FVJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const firestore = getFirestore(app);
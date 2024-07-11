import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, firestore } from "./firebase.js";
import { makeSet } from "./global.js"

function validate(variable) {
    if (variable != null) {
        return true
    }
    return false
}

const signout = document.createElement("button")
signout.innerText = "Sign Out"
signout.id = "signout"

document.getElementById("back").append(signout)

signout.addEventListener("click", () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Signed Out")
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
})


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

async function loadUserData(uid) {
    var userData = {};
    const docRef = doc(firestore, "public", `${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        userData = docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        alert("There is no user with that username")
        window.location.href = "../"
    }
    // load stuff in
    
    document.getElementById("username").innerText = userData.username;

    if (validate(userData.displayname)) {
        document.getElementById("display-name").innerText = userData.displayname;
        document.querySelector("title").innerText = `${userData.displayname}'s Profile`;
    }
    else {
        document.getElementById("display-name").innerText = userData.username;
        document.querySelector("title").innerText = `@${userData.username}'s Profile`;
    }
    
    
    if (validate(userData.collection)) {
        // do collection stuff
        
        let collection = userData.collection


        for (const sport in collection) {
            const setStrings = Object.keys(collection[sport]).sort()
            for (const setString in setStrings) {
                let split = setStrings[setString].split("-")

                if (split.length == 3) {
                    const year = split[0]
                    const brand = split[1]
                    const set = split[2]
                    

                    

                    const theDoc = doc(firestore, "basketball", year);

                    const docShot = await getDoc(theDoc);
                    var data = {}
                    if (docShot.exists()) {
                        if (set == "base") {
                            data = docShot.data()[brand]
                        }
                        else {
                            data = docShot.data()[`${brand} ${set}`]
                        }
                    } else {
                        // docSnap.data() will be undefined in this case
                        console.log("No such document!");
                    }
                    

                    makeSet(year, brand, set, sport, data, null, collection[sport][`${year}-${brand}-${set}`])

                    
                }
            }
        }

    }
    else {
        // show message
        document.getElementById("collection").innerHTML = "<h3>This user dosent have a collection yet.</h3>"
    }
}

if (urlParams.get("user") != null) {
    const docRef = doc(firestore, "usernames", urlParams.get("user"));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let uid = docSnap.data()["uid"]
        console.log(uid)
        if (uid != null) {
            loadUserData(uid)
        }
        else {
            alert("There is no user with that username")
            window.location.href = "../"
        }
    } else {
        // docSnap.data() will be undefined in this case
        alert("There is no user with that username")
        window.location.href = "../"
    }

}
else {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadUserData(user.uid)
        }
    })
}


function removeAllActive() {
    document.getElementById("filters").childNodes.forEach((element) => {
        if (element.classList != undefined) {
            element.classList.remove("active");
        }
    })
}

function hideAllPages() {
    document.getElementById("pages").childNodes.forEach((element) => {
        if (element.classList != undefined) {
            element.classList.remove("activepage");
        }
    })
}

document.getElementById("filters").childNodes.forEach((element) => {
    element.addEventListener("click", () => {
        removeAllActive()
        hideAllPages()
        element.classList.add("active");
        if (document.getElementById(element.getAttribute("data-page")) == null) {
            document.getElementById("nullpage").classList.add("activepage")
        }
        else {
            document.getElementById(element.getAttribute("data-page")).classList.add("activepage");
        }
    })
})
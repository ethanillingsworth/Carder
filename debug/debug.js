import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firestore, auth } from "/js/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const bar = document.getElementById("file")
const label = document.getElementById("label")
var counterMax = 0
var curCount = 0
var afterNum = 0
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(1)
        let sport = "football"
        fetch(`../debug/${sport}.json`)
            .then((response) => response.json())
            .then(async (json) => {
                label.innerText = "Got JSON"
                await new Promise(r => setTimeout(r, 1000));
                label.innerText = "Splitting into years"
                await new Promise(r => setTimeout(r, 1000));
                let yearArray = []

                for (let i = 2017; i <= 2022; i++) {
                    yearArray.push(i.toString())
                }
                //for (const year in json) {
                //    yearArray.push(year)
                //}
                
                for (const year in yearArray) {
                    if (json[yearArray[year]] != null) {
                        counterMax += Object.keys(json[yearArray[year]]).length
                    }
                }
                
                bar.max = counterMax
                
                for (const year in yearArray) {
                    console.log(yearArray[year])
                    
                    var docRef = doc(firestore, `${sport}`, `${yearArray[year]}`);
                    for (const brand in json[yearArray[year]]) {
                        await setDoc(docRef, {[brand]: json[yearArray[year]][brand]}, {merge: true})
                        .catch((error) => {
                            console.log(`Unsuccessful returned error ${error}`)
                            afterNum += 1
                            docRef = doc(firestore, sport, `${yearArray[year]}-${afterNum}`)
                        });

                        label.innerText = `Proccesed ${brand} for ${yearArray[year]}`
                        curCount += 1
                        bar.value = curCount
                        document.getElementById("percent").innerText = ((curCount / counterMax) * 100).toFixed(2)
                    }    
                    afterNum = 0
                    label.innerText = `Processed year ${yearArray[year]}`
                    await new Promise(r => setTimeout(r, 1000));

                }
                label.innerText = "DONE!"
                
            });
    }
})


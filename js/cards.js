import { firestore } from "./firebase.js";
import { collection, getDocs, query, limit, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { makeSet } from "./global.js"


const yearRef = collection(firestore, "basketball")
let yearSnap = await getDocs(query(yearRef, limit(10)))

yearSnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data()
    
    const keySet = Object.keys(data)
    for (const index in keySet) {
        const setName = keySet[index]
        const set = data[setName]
        const split = setName.split(" ")
    
        if (split.length == 1) {
            makeSet(doc.id, split[0], "base", "basketball", set)
        }
        else if (split.length >= 2) {
            let finalName = ""
            for (const index in split) {
                if (index != 0) {
                    finalName += split[index] + " "
                }
            }
            finalName.trim()
            makeSet(doc.id, split[0], finalName, "basketball", set)
        }
        
        
    }
    
    
});


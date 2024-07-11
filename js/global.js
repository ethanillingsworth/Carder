
document.getElementById("topbar").innerHTML = `
<button id="home" href="../">Home</button>
<button id="profile" href="../user">Profile</button>
<button id="cards" href="../cards">Cards</button>
<div class="row-reverse stretch100w nomargin" id="back">
</div>
`

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

document.getElementById("topbar").childNodes.forEach((element) => {
    if (element.nodeName == "BUTTON") {
        element.addEventListener("click", () => {
            window.location.href = element.getAttribute("href");
        });
    }
})

// thank you google!
export function isInViewport(elem, offset = 0) {
    const bounding = elem.getBoundingClientRect();
    return (bounding.top >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset);
}


export function makeSet(year, brand, setName, sport, setData, limit, has) {
    const collectionElement = document.getElementById("collection")
    collectionElement.innerHTML += `
    <div class="card-set" id="${year}-${brand}-${setName}">

    </div>
    `


    let cardSet = document.getElementById(`${year}-${brand}-${setName}`)
    if (setName == "base") {
        cardSet.innerHTML += `
        <h3>${year} ${brand.capitalize()} (${sport.capitalize()})</h3>
        `

    }
    else {
        cardSet.innerHTML += `
        <h3>${year} ${brand.capitalize()} ${setName.capitalize()} (${sport.capitalize()})</h3>
        `
    }

    const roll = document.createElement("div")
    roll.classList.add("roll")
    roll.classList.add("row")
    cardSet.append(roll)

    if (has != null) {
        for (const index in has.sort()) {
            const card = setData[has[index]]
            cardSet.querySelector(".roll").innerHTML += `
            <div class="card">
                <div class="overlay">
                    <h3>${has[index]}</h3>
                    <h4>${card.name}</h4>
                </div>
                <img src="https://via.placeholder.com/180x252" alt="card">
            </div>
            `
        }
    }
    else {

        const keySet = Object.keys(setData).slice(0, limit)
        for (const index in keySet) {
            let cardNum = keySet[index]
            let card = setData[cardNum]

            if (card != null) {
                cardSet.querySelector(".roll").innerHTML += `
                <div class="card">
                    <div class="overlay">
                        <h3>${cardNum}</h3>
                        <h4>${card.name}</h4>
                    </div>
                    <img src="https://via.placeholder.com/180x252" alt="card">
                </div>
                `
            }
        }
    }

}
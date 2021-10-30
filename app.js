const birthsBtn = document.getElementById("birthsBtn")
const eventsBtn = document.getElementById("eventsBtn")
const holidaysBtn = document.getElementById("holidaysBtn")
const deathsBtn = document.getElementById("deathsBtn")
const display = document.getElementById("display")
const list = document.getElementById("main")
const time = new Date()
const month = time.getMonth() + 1
const day = time.getDate()
// let births = []
// let events = []
// let holidays = []
// let deaths = []

// Type the welcome message
const hello = new Typed("#welcome", {
    strings: ["Today's date is", `On ${day}/${month}`],
    typeSpeed: 60,
    loop: false,
    showCursor: false
})
// Animate the Navbar's appearance
anime({
    targets: "button",
    translateY: [-300, 0],
    delay: anime.stagger(100, {start: 7300})
})
// Animate intro
anime({
    targets: ".intro",
    opacity: [0, 1],
    delay: 3700
})
// Fetch ON THIS DAY data from Wikipedia
async function onthisDay(month, day){
    try{
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`)
        const json = await res.json()
        births = json.births
        events = json.events
        holidays = json.holidays
        deaths = json.deaths
    }
    catch(err){
        console.log(err)
    }
}
onthisDay(`${month}`, `${day}`);

function updateDisplay(occasion){
    display.innerHTML = ""
    occasion.forEach(episode => {
        display.innerHTML +=
        `<p>${episode.text}</p>`
    })
}

birthsBtn.addEventListener("click", (e) => {
    document.getElementById("display").className = "border border-primary rounded border-2"
    updateDisplay(births)
    // console.log(birth.pages[0].thumbnail.source)<img src="birth.pages[0].thumbnail.source" class="card-img-top bg-dark" alt="No image found">    
})
eventsBtn.addEventListener("click", (e) => {
    document.getElementById("display").className = "border border-success rounded border-2"
    updateDisplay(events)
})
holidaysBtn.addEventListener("click", (e) => {
    document.getElementById("display").className = "border border-secondary rounded border-2"
    updateDisplay(holidays)
})
deathsBtn.addEventListener("click", (e) => {
    document.getElementById("display").className = "border border-danger rounded border-2"
    updateDisplay(deaths)
})
// async function wikipedia(title) {
//     try{
//         const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}?redirect=false`)
//         const json = await res.json();
//         const btfly = new Typed("#btfly", {
//             strings: [json.extract],
//             typeSpeed: 10,
//             showCursor: false
//         })
//         return json.extract
//     }
//     catch(err){
//         console.log(err)
//     }
// }


// wikipedia("Butterfly");

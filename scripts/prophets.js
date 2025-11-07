const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json"
const cards = document.querySelector("#cards")

async function getProphets(){
    const response = await fetch(url);
    const data = response.json()
    DisplayProphets(data.prophets)
    
}
 console.log(getProphets())
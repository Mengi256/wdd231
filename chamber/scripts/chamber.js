

document.getElementById("timestamp").value = new Date().toISOString();


const modalLinks = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll("dialog"); 
const closes = document.querySelectorAll(".close");


modalLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const modalId = link.dataset.modal;
    const modal = document.getElementById(modalId);
    modal.showModal();  
  });
});


closes.forEach(btn => {
  btn.addEventListener("click", () => {
    const dialog = btn.closest("dialog");
    dialog.close();     
  });
});




// ===== Members Section =====
const members_container = document.querySelector("#members-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

if (members_container) {
    async function getMembers() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
            DisplayMembers(data.members);
        } catch (error) {
            console.error("Error loading members:", error);
        }
    }

    function DisplayMembers(members) {
        members_container.innerHTML = '';
        members.forEach(member => {
            const div = document.createElement("div");
            div.classList.add('member-box');
            div.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phoneNumber}</p>
                <p><strong>Membership:</strong> <span>${member.membership}</span></p>
                <a href="${member.website}">Visit Our Website</a>
            `;
            members_container.appendChild(div);
        });
    }

    getMembers();

    if (gridBtn && listBtn) {
        gridBtn.addEventListener('click', () => {
            members_container.classList.add('grid');
            members_container.classList.remove('list');
        });

        listBtn.addEventListener('click', () => {
            members_container.classList.add('list');
            members_container.classList.remove('grid');
        });
    }
}


const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const lastmodified = document.querySelector("#lastmodified");
if (lastmodified) lastmodified.textContent = `LastModified: ${document.lastModified}`;

const menu = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
const header_img_box = document.querySelector(".header-img-box");

if (menu && navigation && header_img_box) {
    menu.addEventListener("click", () => {
        menu.classList.toggle("show");
        navigation.classList.toggle("show");
        header_img_box.classList.toggle("show");
    });
}


const currentWeatherDiv = document.querySelector("#current-weather");
const forecastDiv = document.querySelector("#forecast");

const lat = 0.6150; // Iganga
const lon = 33.4850;
const apiKey = "9abdf39ffab4ecc7387a4fd7b45814b4";

function formatTime(timestamp, timezoneOffset) {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes.toString().padStart(2,'0')} ${ampm}`;
}


async function getCurrentWeather() {
    if (!currentWeatherDiv) return;

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const tempHigh = Math.round(data.main.temp_max);
        const tempLow = Math.round(data.main.temp_min);
        const humidity = data.main.humidity;
        const sunrise = formatTime(data.sys.sunrise, data.timezone);
        const sunset = formatTime(data.sys.sunset, data.timezone);

        currentWeatherDiv.innerHTML = `
            <h2>Current Weather</h2>
            <p> <strong>${temp}°F</strong> 
             <p> ${description}</p>
            <p>High: ${tempHigh}°F</p>
            <p>Low: ${tempLow}°F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Sunrise: ${sunrise} </p>
             <p> Sunset: ${sunset}</p>
        `;
    } catch (error) {
        currentWeatherDiv.textContent = "Unable to fetch weather data.";
        console.error(error);
    }
}


async function getForecast() {
    if (!forecastDiv) return;

    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        forecastDiv.innerHTML = `<h2>Weather Forecast</h2>`;

        const forecastDays = [];
        const today = new Date().toISOString().split("T")[0]; 

        
        for (const item of data.list) {
            const date = item.dt_txt.split(" ")[0];
            if (!forecastDays.includes(date) && date >= today) {
                forecastDays.push(date);
            }
            if (forecastDays.length === 3) break; 
        }

        // Display forecast
        forecastDays.forEach((date, index) => {
            const dayData = data.list.find(item => item.dt_txt.startsWith(date));
            const temp = Math.round(dayData.main.temp);
            let dayName;

            if (index === 0) {
                dayName = "Today"; 
            } else {
                dayName = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
            }

            const p = document.createElement("p");
            p.textContent = `${dayName}: ${temp}°F`;
            forecastDiv.appendChild(p);
        });

    } catch (error) {
        forecastDiv.textContent = "Unable to fetch forecast data.";
        console.error(error);
    }
}



getCurrentWeather();
getForecast();


const spotlightContainer = document.querySelector("#spotlight-container");

if (spotlightContainer) {
    async function getSpotlightMembers() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();

            const eligibleMembers = data.members.filter(member =>
                member.membership.toLowerCase() === "gold" || member.membership.toLowerCase() === "silver"
            );

            const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
            const spotlightMembers = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

            spotlightContainer.innerHTML = '';
            spotlightMembers.forEach(member => {
                const div = document.createElement("div");
                div.classList.add('spotlight-card');
                div.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phoneNumber}</p>
                    <p><strong>Membership:</strong> ${member.membership}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
                spotlightContainer.appendChild(div);
            });
        } catch (error) {
            console.error("Error loading spotlight members:", error);
        }
    }

    getSpotlightMembers();
}



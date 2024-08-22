const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_name = document.getElementById('location-name');
const location_time = document.getElementById('location-time');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const container = document.querySelector('.container');

async function checkWeather(city) {
    const api_key = "100bcfdd34ae8e1c5f4ceebd36bb2823";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.classList.remove('show');
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.classList.add('show');

    const weatherCondition = weather_data.weather[0].main;
    const currentTime = weather_data.dt;
    const sunriseTime = weather_data.sys.sunrise;
    const sunsetTime = weather_data.sys.sunset;
    const timezoneOffset = weather_data.timezone;

    // Update the location name
    location_name.textContent = `${weather_data.name}, ${weather_data.sys.country}`;

    // Calculate and update the local time at the searched location
    const localTime = new Date((currentTime + timezoneOffset) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    location_time.textContent = `Local Time: ${localTime}`;

    // Update other weather information
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    let isDaytime = currentTime >= sunriseTime && currentTime < sunsetTime;

    if (isDaytime) {
        container.style.backgroundImage = "url('assets/bg2.jpg')";
    } else {
        container.style.backgroundImage = "url('assets/bg3.jpg')";
    }

    if (weatherCondition === 'Clear') {
        weather_img.src = isDaytime ? "/assets/clear.png" : "/assets/clearn.png";
    } else if (weatherCondition === 'Clouds') {
        weather_img.src = isDaytime ? "/assets/cloud.png" : "/assets/cloudn.png";
    } else if (weatherCondition === 'Rain','Rain','Drizzle') {
        weather_img.src = "/assets/rain.png";
    } else if (weatherCondition === 'Mist') {
        weather_img.src = "/assets/mist.png";
    } else if (weatherCondition === 'Snow') {
        weather_img.src = "/assets/snow.png";
    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

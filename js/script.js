document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=22eac1d537344ebe8a9205715242806&q=${lat},${lon}&days=3`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    displayWeatherData(data);
                    displayForecastWeatherData(data.forecast.forecastday[1], 2);
                    displayForecastWeatherData(data.forecast.forecastday[2], 3);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
});

const locIp = document.getElementById('loc-ip');
const findBtn = document.getElementById('find-btn');
locIp.addEventListener('input', () => {
    fetchWeatherData();
});
findBtn.addEventListener('click', () => {
    fetchWeatherData();
});

function fetchWeatherData() {
    const location = locIp.value;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=22eac1d537344ebe8a9205715242806&q=${location}&days=3`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            displayForecastWeatherData(data.forecast.forecastday[1], 2);
            displayForecastWeatherData(data.forecast.forecastday[2], 3);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    const weatherDiv1 = document.getElementById('weather-div1');
    const currentDate = new Date(data.location.localtime);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today = days[currentDate.getDay()];
    const date = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const locationName = `${data.location.name}, ${data.location.country}`;
    const temperature = `${data.current.temp_c} °C`;
    const conditionIcon = `https:${data.current.condition.icon}`;
    const conditionText = data.current.condition.text;

    weatherDiv1.innerHTML = `
        <p>${today} ${date} ${month}</p>
        <p>${locationName}</p>
        <h1 class="pb-3">${temperature}</h1>
        <img src="${conditionIcon}" alt="Weather Icon">
        <span>${conditionText}</span>
        <i class="fa-solid fa-umbrella p-1"></i> 20%  <i class="fa-solid fa-wind p-1"></i> 18 km/hr <i class="fa-regular fa-compass p-1"></i> East
    `;
}

function displayForecastWeatherData(forecastDay, i) {
    const weatherDiv = document.getElementById(`weather-div${i}`);
    const forecastDate = new Date(forecastDay.date);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[forecastDate.getDay()];
    const temperature = `${forecastDay.day.avgtemp_c} °C`;
    const feelsLikeTemp = `${forecastDay.day.avgtemp_c}°`;
    const conditionIcon = `https:${forecastDay.day.condition.icon}`;
    const conditionText = forecastDay.day.condition.text;

    weatherDiv.innerHTML = `
        <p class="text-center">${dayName}</p>
        <img src="${conditionIcon}" alt="Weather Icon">
        <h3 class="text-center">${temperature}</h3>
        <p class="text-center">${feelsLikeTemp}</p>
        <span class="text-center">${conditionText}</span>
    `;
}
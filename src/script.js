const API_KEY = 'ec1248167fa29fbb151a08eaa0f70051';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

document.getElementById('searchBtn').addEventListener('click', getWeather);
document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') getWeather();
});

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`${WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        displayWeather(data);
        getForecast(city);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = `
        <div class="weather-info">
            <h2>${data.name}, ${data.sys.country}</h2>
            <div class="temperature">${Math.round(data.main.temp)}°C</div>
            <div class="description">${data.weather[0].description}</div>
            <div class="details">
                <div class="detail-item">Humidity: ${data.main.humidity}%</div>
                <div class="detail-item">Wind: ${data.wind.speed} m/s</div>
                <div class="detail-item">Pressure: ${data.main.pressure} hPa</div>
            </div>
        </div>
    `;
}

async function getForecast(city) {
    try {
        const response = await fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error('Forecast not available');

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Forecast error:', error);
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    // Get one forecast per day (at noon)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <div>${dayName}</div>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
            <div>${temp}°C</div>
        `;
        forecastContainer.appendChild(forecastDay);
    });
}
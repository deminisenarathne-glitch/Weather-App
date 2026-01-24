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
      <div>${data.weather[0].description}</div>

      <div class="details">
        <div class="detail-item"><strong>Feels Like</strong><br>${Math.round(data.main.feels_like)}°C</div>
        <div class="detail-item"><strong>Humidity</strong><br>${data.main.humidity}%</div>
        <div class="detail-item"><strong>Wind</strong><br>${data.wind.speed} m/s</div>
        <div class="detail-item"><strong>Pressure</strong><br>${data.main.pressure} hPa</div>
      </div>
    </div>
  `;
}

async function getForecast(city) {
  try {
    const response = await fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error('Forecast error');

    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.log(error);
  }
}

function displayForecast(data) {
  if (!data.list) return;

  const forecastContainer = document.getElementById('forecastContainer');
  forecastContainer.innerHTML = '';

  const dailyForecast = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  dailyForecast.forEach(day => {
    const date = new Date(day.dt_txt).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    forecastContainer.innerHTML += `
      <div class="forecast-day">
        <h3>${date}</h3>
        <div>${Math.round(day.main.temp)}°C</div>
        <div>${day.weather[0].description}</div>
        <div>💧 ${day.main.humidity}%</div>
      </div>
    `;
  });
}

// Auto-load weather using location
window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      err => console.log(err)
    );
  }
});

async function getWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(`${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    displayWeather(data);
    getForecast(data.name);
  } catch (error) {
    console.log(error);
  }
}

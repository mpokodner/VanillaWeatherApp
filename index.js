// Function to get and display current weather data
function getCurrentWeather(city) {
  let apiKey = "207446fe5b843td6o246060ad31759ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

// Function to display current weather data
function displayCurrentWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("h1.city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  // Get forecast for the same city after displaying current weather
  getForecast(response.data.city);
}

// Format date for current weather display
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${hours}:${minutes}`;
}

// Format day name for forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

// Function to display 6-day forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  if (!response.data.daily) {
    forecastElement.innerHTML = "<p>No forecast data available.</p>";
    return;
  }

  // Create forecast HTML with flexbox
  let forecastHtml = `<div class="forecast-container">`;

  // Display 6 days of forecast
  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml += `
        <div class="forecast-day">
          <div class="forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="forecast-icon" />
          <div class="forecast-temperatures">
            <span class="forecast-temp-max"><strong>${Math.round(
              day.temperature.maximum
            )}°</strong></span>
            <span class="forecast-temp-min">${Math.round(
              day.temperature.minimum
            )}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastHtml += `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

// Function to get forecast data
function getForecast(city) {
  let apiKey = "207446fe5b843td6o246060ad31759ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Function to handle city search
function searchCity(city) {
  if (!city) return;
  getCurrentWeather(city);
}

// Function to handle search form submission
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value.trim();

  if (city) {
    searchCity(city);
  }
}

// Initialize the app when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);

  // Load default city on page load
  searchCity("Paris");
});

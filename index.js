function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");

function searchCity(city) {
  let apiKey = "207446fe5b843td6o246060ad31759ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function refreshWeather(response) {
  let temperatureElement = document.querySelector(".current-temperature");
  let temperature = response.data.temperature.current.value;
  let cityElement = document.querySelector(".city");

  cityElement.innerHTML = response.data.searchedCity;
  temperatureElement.innerHTML = `${Math.round(temperature)}`;
}

function refreshWeather(response) {
  let temperatureElement = document.querySelector(".current-temperature");
  let temperature = response.data.temperature;
  let cityElement = document.querySelector("h1");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${Math.round(temperature)}`;
}
function searchCity(city) {
  let apiKey = "207446fe5b843td6o246060ad31759ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");

  searchCity(SearchInput.value);
}

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");

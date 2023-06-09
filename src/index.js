let now = new Date();

let current = document.querySelector("#date-time");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

current.innerHTML = `<em>Last updated:</em> ${currentDay} ${hours}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  let city = document.querySelector("#city-now");
  city.innerHTML = `<strong>${citySearch.value}<strong>`;
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
              ${formatDay(forecastDay.dt)}
              <br />
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" width="75px"/>
              <br />
              <strong>${Math.round(
                forecastDay.temp.max
              )}°</strong> ${Math.round(forecastDay.temp.min)}°
              </div>
              `;
      forecastElement.innerHTML = forecastHTML + `</div>`;
    }
  });
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `<strong>${temperature}</strong>`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function searchTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchTemp);

function showLocationTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let locationTemp = document.querySelector("#current-temp");
  locationTemp.innerHTML = `<strong>${temperature}</strong>`;
  let city = document.querySelector("#city-now");
  city.innerHTML = `<strong>${response.data.name}<strong>`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showLocationTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-temp");
locationButton.addEventListener("click", getCurrentPosition);

let celsiusTemperature = null;

searchCity("Albany");

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

current.innerHTML = `${currentDay} ${hours}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  let city = document.querySelector("#city-now");
  city.innerHTML = `<strong>${citySearch.value}<strong>`;
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `<strong>${temperature}°</strong>`;
}

function searchTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchTemp);

function showLocationTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let locationTemp = document.querySelector("#current-temp");
  locationTemp.innerHTML = `<strong>${temperature}°</strong>`;
  let city = document.querySelector("#city-now");
  city.innerHTML = `<strong>${response.data.name}<strong>`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showLocationTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-temp");
locationButton.addEventListener("click", getCurrentPosition);

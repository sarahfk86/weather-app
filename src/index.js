let now = new Date();
let Days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let day = Days[now.getDay()];
let date = now.getDate();
let Months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
let month = Months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let seconds = now.getSeconds();
if (seconds < 10) {
  seconds = `0${seconds}`;
}
let formattedTime = `${hour}:${minutes}:${seconds}`;
let todaylessDate = `${day}, ${month} ${date}, ${year}`;
let localTime = document.querySelector("#date-time");
function updateTime(event) {
  event.preventDefault();
  localTime.innerHTML = `${todaylessDate} @ ${formattedTime}`;
}
let updater = document.querySelector("#city-search");
updater.addEventListener("submit", updateTime);

let cityForm = document.querySelector("#city-search");
let cityInput = document.querySelector("#change-city");
function getWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temperature}°C`;
  let responseCity = response.data.name;
  document.querySelector("#city-heading").innerHTML = `${responseCity}`;
}
function searchCity(city) {
  let apiKey = "75bb0c1161e91d5869fbb965d8219152";
  let q = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city").value;
  searchCity(city);
}
cityForm.addEventListener("submit", submitSearch);

function searchLocation(position) {
  let apiKey = "75bb0c1161e91d5869fbb965d8219152";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let findButton = document.querySelector("#locate-me");
findButton.addEventListener("click", getLocation);

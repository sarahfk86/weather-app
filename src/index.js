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
  let celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temp-element").innerHTML = `${celsiusTemperature}`;
  let responseCity = response.data.name;
  document.querySelector("#city-heading").innerHTML = `${responseCity}`;
  let conditions = response.data.weather[0].description;
  document.querySelector("#conditions").innerHTML = `${conditions}`;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  document.querySelector(
    "#other-weather"
  ).innerHTML = `${humidity}% | ${wind}km/hr`;
  let iconElement = document.querySelector("#icon-element");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-element");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-element");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#city-search");
form.addEventListener("submit", submitSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

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

citySearch("cleveland");

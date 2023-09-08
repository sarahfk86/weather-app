function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} @ ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class = "col-2">
    <div class = "weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="40"/>
    <div class = "weather-forecast-temperatures">
    <span class = "weather-forecast-temperature-max"> ${Math.round(
      forecastDay.temp.max
    )}°</span>
    <span class = "weather-forecast-temperature-min"> ${Math.round(
      forecastDay.temp.min
    )}°</span></div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
  getForecast(response.data.coord);
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

let celsiusTemperature = null;

let form = document.querySelector("#city-search");
form.addEventListener("submit", submitSearch);

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

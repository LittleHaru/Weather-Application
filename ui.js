import { formatDate,formatTime,weatherIconName } from "./util.js";
const appTemp = document.getElementById("feels-like-info");
const humidityInfo = document.getElementById("humidity-info");
const windInfo = document.getElementById("wind-info");
const percipitationInfo = document.getElementById("percipitation-info")
const hourlyContainer = document.querySelector('.hourly-forecast-content')
const temperatureContainer = document.querySelector('.daily-forecast');
const todayTemperature = document.querySelector('.today-temp');
const todayIcon = document.querySelector('.today-icon')

export function renderDailyWeather(data) {
  const dates = data.time;
  const maxTemps = data.temperature_2m_max;
  const minTemps = data.temperature_2m_min;
  const weatherCodes = data.weather_code || [];

  temperatureContainer.innerHTML = ''

  dates.forEach((date, index) => {
    const day = document.createElement('div');
    day.classList.add("daily")

    const iconName = weatherIconName(weatherCodes[index], true);
    day.innerHTML = `
      <div class="daily-date">${formatDate(date)}</div>
      <img class="daily-weather-icon" src="./assets/images/${iconName}.webp" alt="${iconName.replace(/[-]/g, ' ')}">
      <div class="daily-temp">
        ${Math.round(maxTemps[index])}° / ${Math.round(minTemps[index])}°
      </div>
      `;
    temperatureContainer.appendChild(day);
  });
}

export function renderCurrent(current) {
  const weatherCode = current.weather_code;
  const iconName = weatherIconName(weatherCode, true);
  const temperature = current.temperature_2m;
  todayIcon.src = `./assets/images/${iconName}.webp`;
  todayTemperature.textContent = `${Math.round(temperature)}°C`;
}

export function renderCurrentInfo(current) {
  const feelTemp = current.apparent_temperature;
  const humidity = current.relative_humidity_2m
  const wind = current.wind_speed_10m
  const percipitation = current.precipitation
  appTemp.textContent = feelTemp + "°"
  humidityInfo.textContent = humidity + "%"
  windInfo.textContent = wind // add unit later
  percipitationInfo.textContent = percipitation // add unit later
}

export function renderHourlyWeather(data) {
  const dates = data.time
  const temperature = data.temperature_2m
  const weatherCodes = data.weather_code || []

  hourlyContainer.innerHTML='';

  dates.forEach((date, index) => {
    const hourly = document.createElement('div')
    hourly.classList.add("hourly")
    const iconName = weatherIconName(weatherCodes[index], true)
    const timeDisplay = formatTime(date)
    hourly.innerHTML = `<div class="hourly-left">
      <img class="hourly-weather-icon" src="./assets/images/${iconName}.webp" alt="${iconName.replace(/[-]/g, ' ')}">
      <div class="hourly-time">${timeDisplay}</div>
      </div>
      <div class="hourly-temp">
        ${Math.round(temperature[index])}°
      </div>
      `;
    hourlyContainer.appendChild(hourly);
  }) 
}
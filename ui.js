import { getFullDate, formatShortDate,formatTime,weatherIconName } from "./util.js";
const appTemp = document.getElementById("feels-like-info");
const humidityInfo = document.getElementById("humidity-info");
const windInfo = document.getElementById("wind-info");
const percipitationInfo = document.getElementById("percipitation-info")
const hourlyContainer = document.querySelector('.hourly-forecast-content')
const todayTemperature = document.querySelector('.today-temp');
const todayIcon = document.querySelector('.today-icon');
const currentCountryContainer = document.querySelector('.country-info');
const currentDateContainer = document.querySelector('.date-info')

export function renderDailyWeather(data, symbol) {
  const dates = data.time;
  const maxTemps = data.temperature_2m_max;
  const minTemps = data.temperature_2m_min;
  const weatherCodes = data.weather_code || [];
  const dailyElements = document.querySelectorAll('.daily-info')

  dates.forEach((date, index) => {
    const dailyEl = dailyElements[index]
    if(!dailyEl) return;
    const dailyDate = dailyEl.querySelector('.daily-date')
    const dailyWeatherIcon = dailyEl.querySelector('.daily-weather-icon')
    const dailyTemp = dailyEl.querySelector('.daily-temp')
    const iconName = weatherIconName(weatherCodes[index], true);
    dailyDate.textContent = formatShortDate(date)
    dailyWeatherIcon.src = `./assets/images/${iconName}.webp`
    dailyWeatherIcon.alt = `${iconName.replace(/[-]/g, ' ')}`
    dailyTemp.textContent = `${Math.round(maxTemps[index])}° / ${Math.round(minTemps[index])}${symbol.temp}`
  });
}

export function renderCurrent(current, symbol) {
  const weatherCode = current.weather_code;
  const iconName = weatherIconName(weatherCode, true);
  const temperature = current.temperature_2m;
  todayIcon.src = `./assets/images/${iconName}.webp`;
  todayTemperature.textContent = `${Math.round(temperature)}${symbol.temp}`;
}

export function renderCurrentInfo(current, symbol) {
  const feelTemp = current.apparent_temperature;
  const humidity = current.relative_humidity_2m
  const wind = current.wind_speed_10m
  const percipitation = current.precipitation
  appTemp.textContent = feelTemp + symbol.temp
  humidityInfo.textContent = humidity + "%"
  windInfo.textContent = `${wind} ${symbol.wind}`
  percipitationInfo.textContent = `${percipitation} ${symbol.precip}`
}

export function renderHourlyWeather(data, symbol, selectedDay = null) {
  const dates = data.time
  const temperature = data.temperature_2m
  const weatherCodes = data.weather_code || []

  hourlyContainer.innerHTML='';

  dates.forEach((date, index) => {
    if (selectedDay && !date.startsWith(selectedDay)) {
      return;
    }
    const hourly = document.createElement('div')
    hourly.classList.add("hourly")
    const iconName = weatherIconName(weatherCodes[index], true)
    const timeDisplay = formatTime(date)
    hourly.innerHTML = `<div class="hourly-left">
      <img class="hourly-weather-icon" src="./assets/images/${iconName}.webp" alt="${iconName.replace(/[-]/g, ' ')}">
      <div class="hourly-time">${timeDisplay}</div>
      </div>
      <div class="hourly-temp">
        ${Math.round(temperature[index])}${symbol.temp}
      </div>
      `;
    hourlyContainer.appendChild(hourly);
  }) 
}

export function updateLocationName(countryName, cityName) {
  if (!countryName || !cityName) {
    return
  } else {
    currentCountryContainer.innerHTML = ''
    currentCountryContainer.innerHTML = `${cityName}, ${countryName}`
  }
}

export function updateCurrentDate(currentDate) {
  const date = getFullDate(currentDate);
  const dateNo = date.day
  const dayName = date.weekday
  const monthName = date.month
  const year = date.year
  currentDateContainer.innerHTML = ''
  currentDateContainer.innerHTML = `${dayName}, ${monthName} ${dateNo}, ${year}`
}
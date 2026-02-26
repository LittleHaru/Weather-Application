const temperatureContainer = document.querySelector('.daily-forecast');
const todayTemperature = document.querySelector('.today-temp');
const todayIcon = document.querySelector('.today-icon')
const unitBtn = document.querySelector(".units-btn");
const dropDownMenu = document.querySelector('.dropdown-content');
const dropBtn = document.querySelectorAll(".dropdown-content button");
const metricBtn = document.querySelector(".unit-change");
const appTemp = document.getElementById("feels-like-info");
const humidityInfo = document.getElementById("humidity-info");
const windInfo = document.getElementById("wind-info");
const percipitationInfo = document.getElementById("percipitation-info")
metricBtn.addEventListener("click", changeUnit);

const settings = {
  type: "metric",
  temperature: "celsius",
  windSpeed: "km/h",
  percipitation: "millimeters",
};

const weatherCodeToIcon = {
  0: 'icon-sunny',           
  1: 'icon-partly-cloudy',  
  2: 'icon-partly-cloudy',   
  3: 'icon-overcast',          
  45: 'icon-fog',
  48: 'icon-fog',
  51: 'icon-drizzle',
  53: 'icon-drizzle',
  55: 'icon-drizzle',
  61: 'icon-rain',
  63: 'icon-rain',
  65: 'icon-rain',
  71: 'icon-snow',      
  73: 'icon-snow',     
  75: 'icon-snow',     
  77: 'icon-snow',     
  80: 'icon-rain',      
  81: 'icon-rain',     
  82: 'icon-rain',      
  85: 'icon-snow',      
  86: 'icon-snow',      
  95: 'icon-storm',
  96: 'icon-storm',
  99: 'icon-storm',   
};

function assignSetting(parameter, value) {
  settings[parameter] = value;
}

function changeUnit() {
  settings.type = settings.type === "metric" ? "imperial" : "metric";
}

function dropDown() {
  dropDownMenu.classList.toggle("show");
}
unitBtn.addEventListener("click", dropDown);

document.addEventListener("click", e => {
    if (dropDownMenu.classList.contains("show")) {
        if(!dropDownMenu.contains(e.target) && e.target !== unitBtn) {
            dropDownMenu.classList.toggle("show")
        }
    } else {
        return
    }
})

dropBtn.forEach((button) => {
  const parameter = button.getAttribute("parameter");
  const value = button.getAttribute("value");
  if (
    button.getAttribute("parameter") === null ||
    button.getAttribute("value") === null
  ) {
    return;
  }
  button.addEventListener("click", () => {
    assignSetting(parameter, value);
  });
});

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
        weekday: "short"
    });
}

function renderDailyWeather(data) {
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

function renderCurrent(current) {
  const weatherCode = current.weather_code;
  const iconName = weatherIconName(weatherCode, true);
  const temperature = current.temperature_2m;
  todayIcon.src = `./assets/images/${iconName}.webp`;
  todayTemperature.textContent = `${Math.round(temperature)}°C`;
}

function renderCurrentInfo(current) {
  const feelTemp = current.apparent_temperature;
  const humidity = current.relative_humidity_2m
  const wind = current.wind_speed_10m
  const percipitation = current.precipitation
  appTemp.textContent = feelTemp + "°"
  humidityInfo.textContent = humidity + "%"
  windInfo.textContent = wind // add unit later
  percipitationInfo.textContent = percipitation // add unit later
}

function weatherIconName(weatherCode, isDay) {
  const base = weatherCodeToIcon[weatherCode] || 'unknown';
  return isDay ? `${base}` : `${base}`;
}

function renderHourlyWeather(data) {

}

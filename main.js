import { getWeatherData } from "./api.js";
import { renderCurrent,renderCurrentInfo,renderHourlyWeather,renderDailyWeather } from "./ui.js";
import { getISODate,getDayName } from "./util.js";
// temp data
let currentLat = 3.1292;
let currentLong = 101.6165;
let globalWeatherData = null; // cache the weather data
let currentSelectedDay = getISODate();
let unitSettings = {
  temperature: 'celsius',
  windSpeed: 'kmh',
  percipitation: 'mm'
}
const unitBtn = document.querySelector(".units-btn");
const unitChangeBtn = document.querySelector('.unit-change')
const dayBtn = document.querySelector('.day-dropdown-btn')
const dayBtnName = document.querySelector('.dayName')
const dropDownMenu = document.querySelector('.dropdown-content');
const dropDownDayMenu = document.querySelector('.day-dropdown-content')

unitChangeBtn.addEventListener('click', async () => {
  unitSettings.temperature = (unitSettings.temperature === 'celsius') ? 'fahrenheit' : 'celsius'
  unitSettings.windSpeed = (unitSettings.windSpeed === 'kmh') ? 'mph' : 'kmh'
  unitSettings.percipitation = (unitSettings.percipitation === 'mm') ? 'inch' : 'mm'
  unitChangeBtn.innerHTML = unitSettings.temperature === 'celsius' ? 'Switch to Imperial' : 'Switch to Metric'
  updateCheckmarks()
  await updateDashboard(currentLat, currentLong, unitSettings);
});

function dropDownUnit() {
  dropDownMenu.classList.toggle("show");
}
unitBtn.addEventListener("click", dropDownUnit);

function dropDownDay() {
  dropDownDayMenu.classList.toggle("showDay")
}
dayBtn.addEventListener("click", dropDownDay);

document.addEventListener("click", e => {
    if (dropDownMenu.classList.contains("show")) {
        if(!dropDownMenu.contains(e.target) && e.target !== unitBtn) {
            dropDownMenu.classList.toggle("show")
        }
    } else {
        return
    }
})

async function updateDashboard(lat, long, unitSettings) { // orchestrator
    try {
        const data = await getWeatherData(
          lat,
          long,
          unitSettings.temperature,
          unitSettings.windSpeed,
          unitSettings.percipitation
        )
        globalWeatherData = data
        const symbols = {
          temp: unitSettings.temperature === 'celsius' ? '°C' : '°F',
          wind: unitSettings.windSpeed === 'kmh' ? 'km/h' : 'mph',
          precip: unitSettings.percipitation === 'mm' ? 'mm' : 'inch'
        }
        dropDownDayMenu.innerHTML = '';
        data.daily.time.forEach(date => {
          const btn = document.createElement('button');
          btn.value = date; 
          btn.textContent = getDayName(date);
          dropDownDayMenu.appendChild(btn);
        })
        dayBtnName.textContent = getDayName(currentSelectedDay);
        renderDailyWeather(data.daily, symbols)
        renderCurrent(data.current, symbols)
        renderCurrentInfo(data.current, symbols)
        renderHourlyWeather(data.hourly, symbols, currentSelectedDay)
    } catch (error) {
        showErrorMessage(`Failed To Update Dashboard: ${error}`)
        throw error;
    }
}

function updateCheckmarks() {
  const buttons = document.querySelectorAll('.dropdown-content button[parameter]')
  buttons.forEach(btn => {
    const param = btn.getAttribute('parameter');
    const value = btn.getAttribute('value');
    const checkContainer = btn.querySelector('.check-container')

    if (unitSettings[param] === value) {
      checkContainer.innerHTML = `<img src="./assets/images/icon-checkmark.svg" alt="selected">`;
    } else {
      checkContainer.innerHTML = '';
    }
  });
}

const unitOptionsButtons = document.querySelectorAll('.dropdown-content button')
unitOptionsButtons.forEach(btn => {
  btn.addEventListener('click', async() => {
    const param = btn.getAttribute('parameter');
    const value = btn.getAttribute('value');

    unitSettings[param] = value;

    updateCheckmarks();
    await updateDashboard(currentLat, currentLong, unitSettings)
  })
})

dropDownDayMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    currentSelectedDay = e.target.value;
    dayBtnName.textContent = e.target.textContent 

    const symbols = {
      temp: unitSettings.temperature === 'celsius' ? '°C' : '°F',
      wind: unitSettings.windSpeed === 'kmh' ? 'km/h' : 'mph',
      precip: unitSettings.percipitation === 'mm' ? 'mm' : 'inch'
    };

    if (globalWeatherData) {
      renderHourlyWeather(globalWeatherData.hourly, symbols, currentSelectedDay);
    }
    dropDownDayMenu.classList.remove("showDay");
  }
})

// default render replace with geo location later
updateCheckmarks();
updateDashboard(currentLat,currentLong,unitSettings)
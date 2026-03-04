import { getWeatherData } from "./api.js";
import { renderCurrent,renderCurrentInfo,renderHourlyWeather,renderDailyWeather } from "./ui.js";
import { getISODate,getDayName, getSymbols } from "./util.js";
// temp data
let unitSettings = {
  temperature: 'celsius',
  windSpeed: 'kmh',
  percipitation: 'mm'
}
let currentLat = 3.1292;
let currentLong = 101.6165;
let globalWeatherData = null; // variable to cache the weather data
let currentSelectedDay = getISODate();
const unitBtn = document.querySelector(".units-btn");
const unitChangeBtn = document.querySelector('.unit-change')
const dayBtn = document.querySelector('.day-dropdown-btn')
const dayBtnName = document.querySelector('.dayName')
const dropDownMenu = document.querySelector('.dropdown-content');
const dropDownDayMenu = document.querySelector('.day-dropdown-content')

unitChangeBtn.addEventListener('click', async () => {
  const isCurrentMetric = unitSettings.temperature === 'celsius';

  if (isCurrentMetric) {
    unitSettings.temperature = 'fahrenheit'
    unitSettings.windSpeed = 'mph'
    unitSettings.percipitation = 'inch'
    unitChangeBtn.innerHTML = 'Switch to Metric'
  } else {
    unitSettings.temperature = 'celsius'
    unitSettings.windSpeed = 'kmh'
    unitSettings.percipitation = 'mm'
    unitChangeBtn.innerHTML = 'Switch to Imperial'
  }
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
        dropDownDayMenu.innerHTML = '';
        data.daily.time.forEach(date => {
          const btn = document.createElement('button');
          btn.value = date; 
          btn.textContent = getDayName(date);
          dropDownDayMenu.appendChild(btn);
        })
        const currentSymbol = getSymbols(unitSettings);
        dayBtnName.textContent = getDayName(currentSelectedDay);
        renderDailyWeather(data.daily, currentSymbol)
        renderCurrent(data.current, currentSymbol)
        renderCurrentInfo(data.current, currentSymbol)
        renderHourlyWeather(data.hourly, currentSymbol, currentSelectedDay)
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
    const currentSymbol = getSymbols(unitSettings);

    if (globalWeatherData) {
      renderHourlyWeather(globalWeatherData.hourly, currentSymbol, currentSelectedDay);
    }
    dropDownDayMenu.classList.remove("showDay");
  }
})

// default render replace with geo location later
updateCheckmarks();
updateDashboard(currentLat,currentLong,unitSettings)
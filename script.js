import { getWeatherData } from "./api.js";
import { renderCurrent,renderCurrentInfo,renderHourlyWeather,renderDailyWeather } from "./ui.js";
// temp data
let currentLat = 3.1292;
let currentLong = 101.6165;
let currentUnit = 'celsius'
const unitBtn = document.querySelector(".units-btn");
const unitChangeBtn = document.querySelector('.unit-change')
const dayBtn = document.querySelector('.day-dropdown-btn')
const dropDownMenu = document.querySelector('.dropdown-content');
const dropDownDayMenu = document.querySelector('.day-dropdown-content')
const dropBtn = document.querySelectorAll(".dropdown-content button");
unitBtn.addEventListener("click", changeUnit);

unitChangeBtn.addEventListener('click', async () => {
  currentUnit = (currentUnit === 'celsius') ? 'fahrenheit' : 'celsius'
  unitChangeBtn.innerHTML = currentUnit === 'celsius' ? 'Switch to Imperial' : 'Switch to Metric'
  await updateDashboard(currentLat,currentLong,currentUnit);
});

function changeUnit() {
  settings.type = settings.type === "metric" ? "imperial" : "metric";
}

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

async function updateDashboard(lat, long, unit) { // orchestrator
    try {
        const data = await getWeatherData(lat,long,unit)
        renderDailyWeather(data.daily)
        renderCurrent(data.current)
        renderCurrentInfo(data.current)
        renderHourlyWeather(data.hourly)
    } catch (error) {
        showErrorMessage(`Failed To Update Dashboard: ${error}`)
        throw error;
    }
}

// default render replace with geo location later
updateDashboard(3.1292, 101.6165,'celsius');



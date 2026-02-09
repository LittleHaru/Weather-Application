const temperatureContainer = document.querySelector('.daily-forecast')
const todayTemperature = document.querySelector('.today-temp')

const settings = {
  type: "metric",
  temperature: "celsius",
  windSpeed: "km/h",
  percipitation: "millimeters",
};

function assignSetting(parameter, value) {
  settings[parameter] = value;
}

function changeUnit() {
  settings.type = settings.type === "metric" ? "imperial" : "metric";
}

const unitBtn = document.querySelector(".units-btn");
const dropDownMenu = document.querySelector('.dropdown-content');
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

const dropBtn = document.querySelectorAll(".dropdown-content button");
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

const metricBtn = document.querySelector(".unit-change");
metricBtn.addEventListener("click", changeUnit);


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
        weekday: "short"
    });
}

function renderWeather(data) {
  const dates = data.time;
  const maxTemps = data.temperature_2m_max;
  const minTemps = data.temperature_2m_min;

  temperatureContainer.innerHTML = ''

  dates.forEach((date,index) => {
    const day = document.createElement('div');
    day.classList.add("daily")

    day.innerHTML = `
      <div class="daily-date">${formatDate(date)}</div>
      <div class="daily-temp">
        ${Math.round(maxTemps[index])}° / ${Math.round(minTemps[index])}°
      </div>
      `;

    temperatureContainer.appendChild(day);
  });
}

function renderCurrent(current) {
  todayTemperature.textContent = `${Math.round(current.temperature)}°C`;
}

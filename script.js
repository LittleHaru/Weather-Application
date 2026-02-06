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
function dropDown() {
  document.querySelector(".dropdown-content").classList.toggle("show");
}
unitBtn.addEventListener("click", dropDown);

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

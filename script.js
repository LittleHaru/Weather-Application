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

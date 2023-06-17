import { getForecastData } from "./api.js";

function updateCityName(name) {
  const cityName = document.querySelector(".city-name");
  cityName.textContent = name;
}

function updateCityTemp(temp) {
  const cityTemp = document.querySelector(".city-temp");
  cityTemp.textContent = temp + "°";
}

function updateCityCondition(cond) {
  const cityCondition = document.querySelector(".city-cond");
  cityCondition.textContent = cond;
}

function updateChanceOfRain(perc) {
  const rainChance = document.querySelector(".chance-of-rain>span");
  const rainChanceAir = document.querySelector(".rain-chance+.air-info-data");
  rainChance.textContent = perc;
  rainChanceAir.textContent = `${perc} %`;
}

function updateHourlyForecast(hours, time) {
  const forecastList = document.querySelector(".today-forecast-list");
  for (let i = time + 1; i < time + 7; i++) {
    if (i === 24) {
      i = 0;
    }
    const forecastItem = document.createElement("li");
    forecastItem.classList.add("today-forecast-item");
    // Today forecast time
    const forecastTime = document.createElement("h5");
    forecastTime.classList.add("today-forecast-time");
    console.log(Math.round(i / 12));
    forecastTime.textContent = `${i % 12 === 0 ? "12" : i % 12}:00 ${
      Math.ceil(i / 12) === 1 ? "AM" : "PM"
    }`;
    // Today forecast icon
    const forecastIcon = document.createElement("div");
    forecastIcon.classList.add("today-weather-icon");
    const forecastIconImg = document.createElement("img");
    forecastIconImg.src = "https://img.icons8.com/fluency/48/summer.png";
    forecastIcon.append(forecastIconImg);
    //Today forecast temp
    const forecastTemp = document.createElement("p");
    forecastTemp.classList.add("today-forecast-temp");
    forecastTemp.textContent = Math.round(hours[i]["temp_c"]);
    //Appending all to forecast item and then to forecast list
    forecastItem.append(forecastTime);
    forecastItem.append(forecastIcon);
    forecastItem.append(forecastTemp);
    forecastList.append(forecastItem);
  }
}

function updateFeel(temp) {
  const fellsLike = document.querySelector(".real-feel+.air-info-data");
  fellsLike.textContent = Math.round(temp) + "°";
}

function updateWind(speed) {
  const windSpeed = document.querySelector(".wind+.air-info-data");
  windSpeed.textContent = `${speed} km/h`;
}

function updateUV(uvIndex) {
  const uv = document.querySelector(".uv+.air-info-data");
  uv.textContent = uvIndex;
}

getForecastData("esfahan").then((data) => {
  const date = new Date();
  updateCityName(data.location.name);
  updateCityTemp(data.current["temp_c"]);
  updateCityCondition(data.current.condition.text);
  updateFeel(data.current.feelslike_c);
  updateWind(data.current.wind_kph);
  updateChanceOfRain(
    data.forecast.forecastday["0"]["hour"][date.getHours()]["chance_of_rain"]
  );
  updateHourlyForecast(data.forecast.forecastday["0"]["hour"], date.getHours());
  updateUV(data.current.uv);
});

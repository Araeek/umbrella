import { getForecastData, getDailyForecastData } from "./api.js";

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

function updateCityIcon(isday, code) {
  const cityIcon = document.querySelector(".weather-icon img");
  cityIcon.src = `assets/icons/${isday ? "day" : "night"}/${code}.png`;
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
    forecastTime.textContent = `${i % 12 === 0 ? "12" : i % 12}:00 ${
      Math.ceil(i / 12) === 1 ? "AM" : "PM"
    }`;
    // Today forecast icon
    const forecastIcon = document.createElement("div");
    forecastIcon.classList.add("today-weather-icon");
    const forecastIconImg = document.createElement("img");
    forecastIconImg.src = `assets/icons/${
      hours[i]["is_day"] ? "day" : "night"
    }/${hours[i]["condition"]["code"]}.png`;
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

function updateDailyForecast(days) {
  const dayForecastList = document.querySelector("#seven-forecast-list");
  for (let i = 0; i < 7; i++) {
    const dayForecastItem = document.createElement("li");
    dayForecastItem.classList.add("seven-forecast-item");
    //day forecast day
    const dayForecastDay = document.createElement("span");
    dayForecastDay.classList.add("seven-forecast-day");
    const WEEKDAYS = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    dayForecastDay.textContent = `${
      i === 0 ? "Today" : WEEKDAYS[new Date(days[i]["datetime"]).getDay()]
    }`;
    //day forecast icon
    const dayForecastIcon = document.createElement("div");
    dayForecastIcon.classList.add("seven-forecast-weather");
    const dayForecastIconImg = document.createElement("img");
    const ICONS_CODE = {
      "snow": 1225,
      "rain": 1189,
      "fog": 1030,
      "wind": 1542,
      "cloudy": 1006,
      "partly-cloudy-day": 1003,
      "partly-cloudy-night": 1003,
      "clear-day": 1000,
      "clear-night": 1000
    }
    dayForecastIconImg.src = `assets/icons/day/${ICONS_CODE[days[i]["icon"]]}.png`;
    const dayForecastText = document.createElement("p");
    dayForecastText.textContent = days[i]["conditions"];
    dayForecastIcon.append(dayForecastIconImg);
    dayForecastIcon.append(dayForecastText);
    //day forecast highlow
    const dayHighlow = document.createElement("p");
    dayHighlow.classList.add("high-low");
    const low = document.createElement("span");
    low.textContent = Math.round(days[i]["tempmax"]);
    dayHighlow.append(low);
    dayHighlow.append(`/${Math.round(days[i]["tempmin"])}`);
    //appending all
    dayForecastItem.append(dayForecastDay);
    dayForecastItem.append(dayForecastIcon);
    dayForecastItem.append(dayHighlow);
    dayForecastList.append(dayForecastItem);
  }
}

getForecastData("esfahan").then((data) => {
  const date = new Date();
  console.log(date.getDay());
  updateCityName(data.location.name);
  updateCityTemp(data.current["temp_c"]);
  updateCityCondition(data.current.condition.text);
  updateCityIcon(data.current["is_day"], data.current.condition.code);
  updateFeel(data.current.feelslike_c);
  updateWind(data.current.wind_kph);
  updateChanceOfRain(
    data.forecast.forecastday["0"]["hour"][date.getHours()]["chance_of_rain"]
  );
  updateHourlyForecast(data.forecast.forecastday["0"]["hour"], date.getHours());
  updateUV(data.current.uv);
});

getDailyForecastData("esfahan").then((data) => {
  updateDailyForecast(data["days"]);
});

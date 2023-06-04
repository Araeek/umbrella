async function getCurrentData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?q=${city}&key=2d0f4b140e8f4e0fb9664239232005`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

async function getForecastData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${city}&key=2d0f4b140e8f4e0fb9664239232005`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

function returnCurrentData() {
  getCurrentData("esfahan").then((result) => {
    return result;
  });
}

function returnForecastData() {
  getCurrentData("esfahan").then((result) => {
    return result;
  });
}


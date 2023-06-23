async function getForecastData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${city}&key=2d0f4b140e8f4e0fb9664239232005`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

async function getDailyForecastData(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days&key=U6246QRR7XRLWVKSZLRVU2GXK&contentType=json&iconSet=icons1`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export { getForecastData, getDailyForecastData };

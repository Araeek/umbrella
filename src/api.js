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

const headers = new Headers({
  "X-Api-Key": "09tYeXCwhiKsMjQY6ME1Rw==sEbRPFDVhcuP3U1R",
  "Content-Type": "application/json",
});
async function getSearchData(city) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/city?name=${city}&limit=10`,
      {
        mode: "cors",
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
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
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export { getForecastData, getDailyForecastData, getSearchData };

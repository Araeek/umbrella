
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



export { getForecastData };

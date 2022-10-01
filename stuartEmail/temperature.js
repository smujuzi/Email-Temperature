const axios = require("axios");

async function getCurrentTemperatureFromAPI(input) {
  const myKey = "b224a548fa8abc35fc18c056f35f2674";
  let response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}`
  );
  const data = await response.data;
  const result = getAvgTemperature(data.main.temp_min, data.main.temp_max);

  return result;
}

async function getTemperatureInDegrees(location) {
  const tempInKelvin = await getCurrentTemperatureFromAPI(location);
  const temperature = Math.round(convertFromKelvinToDegrees(tempInKelvin));

  return temperature;
}

function getAvgTemperature(minTemp, maxTemp) {
  return (maxTemp + minTemp) / 2;
}

function convertFromKelvinToDegrees(kelvin) {
  return kelvin - 273.15;
}

module.exports = { getTemperatureInDegrees };

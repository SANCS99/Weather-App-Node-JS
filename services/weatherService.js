const axios = require("axios");
const config = require("config");

const weatherApiKey = config.get("weatherApiKey");
const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/weather`;

const getWeatherData = async (location) => {
  try {
    const res = await axios.get(
      `${weatherBaseUrl}?lat=${location.latitude}&lon=${location.longitude}&appid=${weatherApiKey}&units=metric`
    );
    return res.data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

module.exports = { getWeatherData };

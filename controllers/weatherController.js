const Weather = require("../schemas/weatherModel");
const {
  ResponseStatusCodes,
} = require("../util/constants/responseStatusCodes");
const { ResponseCommonMessages } = require("../util/constants/commonErrors");

exports.createWeatherData = async (req, res) => {
  const { userId, date, weather } = req.body;
  try {
    const weatherData = new Weather({ userId, date, weather });
    await weatherData.save();
    res.status(201).json(weatherData);
  } catch (err) {
    console.error(err.message);
    return res
      .status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR,
      });
  }
};

exports.getWeatherData = async (req, res) => {
  const { userId, date } = req.params;
  try {
    const weatherData = await Weather.find({ userId, date: new Date(date) });
    if (!weatherData.length) {
      return res
        .status(404)
        .json({ msg: "No weather data found for this date" });
    }
    res.json(weatherData);
  } catch (err) {
    console.error(err.message);
    return res
      .status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR,
      });
  }
};

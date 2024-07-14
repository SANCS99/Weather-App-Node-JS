const openai = require("openai");

const generateWeatherText = async (weatherData) => {
  try {
    const prompt = `Write a brief and informative text about the weather based on this data: ${JSON.stringify(
      weatherData
    )}`;
    const response = await openai.createCompletion({
      engine: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5,
    });
    return response.data.choices[0].text.trim();
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

module.exports = { generateWeatherText };

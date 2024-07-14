const express = require("express");
const connectDB = require("./db/connect");
const cron = require("node-cron");
const weatherService = require("./services/weatherService");
const emailService = require("./services/emailService");
const User = require("./schemas/userModel");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/weather", require("./routes/weatherRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Schedule to send emails every 3 hours
cron.schedule("0 */3 * * *", async () => {
  try {
    const users = await User.find();
    for (let user of users) {
      const weatherData = await weatherService.getWeatherData(user.location);
      const weatherText = `Current weather in ${user.location}: ${weatherData.weather[0].description}`;
      emailService.sendEmail(
        user.email,
        "Weather Report (3 Hourly)",
        weatherText
      );
    }
  } catch (err) {
    console.error(err.message);
  }
});

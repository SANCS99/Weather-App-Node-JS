const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  weather: { type: String, required: true },
});

module.exports = mongoose.model("Weather", weatherSchema);

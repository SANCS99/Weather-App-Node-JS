const nodemailer = require('nodemailer');
const config = require('config');
const generateWeatherText = require('../util/generateWeatherText'); // Replace with actual path
const getCityName = require('../util/getCityName'); // Replace with actual path

const emailUser = config.get('emailUser');
const emailPass = config.get('emailPass');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
  }
});

const sendEmail = async (to, subject, weatherData) => {
  try {
    const city = await getCityName(weatherData.location);
    const weatherText = await generateWeatherText(weatherData);
    const emailBody = `Current weather in ${city}: ${weatherText}`;
    const mailOptions = {
      from: emailUser,
      to,
      subject: 'Hourly Weather Report',
      text: emailBody
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;

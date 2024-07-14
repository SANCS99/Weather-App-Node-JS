const { Client } = require("@googlemaps/google-maps-services-js");

const geocodingClient = new Client({});

const getCityName = async (location) => {
  try {
    const [response] = await geocodingClient.reverseGeocode({
      latlng: { lat: location.latitude, lng: location.longitude },
    });
    const addressComponents = response.results[0].address_components;
    const city = addressComponents.find(component => component.types.includes('locality'));
    return city ? city.long_name : 'Unknown City';
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

module.exports = { getCityName };
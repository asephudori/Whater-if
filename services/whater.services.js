const axios = require('axios');
const { openMeteoBaseUrl } = require('../config');

module.exports = {
  getWhater: async (latitude, longitude) => {
    const url = `${openMeteoBaseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },
};

require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  cacheTTL: process.env.CACHE_TTL, // Cache TTL in seconds (default: 1 hour)
  openMeteoBaseUrl: 'https://api.open-meteo.com/v1/forecast',
};

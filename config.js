require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  cacheTTL: process.env.CACHE_TTL,
  openMeteoBaseUrl: 'https://api.open-meteo.com/v1/forecast',
};

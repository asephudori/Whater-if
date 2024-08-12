const cacheManager = require('../utils/caching.utils');
const { getWather } = require('../services/whater.services');

module.exports = {
  getWather: async (req, res, next) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        status: false,
        message: 'Bad request',
        error: 'Latitude and longitude parameters are required',
      });
    }

    const cacheKey = `weather:${latitude}:${longitude}`;

    try {
      // Checking cache data
      const cachedData = await cacheManager.get(cacheKey);

      if (cachedData) {
        return res.json({ source: 'cache', data: JSON.parse(cachedData) });
      }

      // If the data is not in the cache, fetch it from the API
      const watherData = await getWather(latitude, longitude);
      await cacheManager.setex(cacheKey, JSON.stringify(watherData));

      return res.json({ source: 'api', data: watherData });
    } catch (error) {
      next(error);
    }
  },
};

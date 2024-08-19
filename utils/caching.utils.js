const redis = require('redis');
const { cacheTTL } = require('../config');

// Setup Redis client
const client = redis.createClient(process.env.REDIS_URL);

client.on('error', (error) => {
  console.error('Redis error: ', error);
});

client.connect().catch(console.error);

module.exports = {
  cacheManager: {
    get: async (key) => {
      try {
        const value = await client.get(key);
        return value;
      } catch (error) {
        console.error('Error getting data from cache:', error);
        throw error;
      }
    },
    setex: async (key, value, ttl = cacheTTL) => {
      try {
        await client.setEx(key, ttl, value);
      } catch (error) {
        console.error('Error setting data to cache:', error);
        throw error;
      }
    },
  },
};

const redis = require('redis');
const { cacheTTL } = require('../config');

// Setup Redis client
const client = redis.createClient(process.env.REDIS_URL);

client.on('error', (error) => {
  console.error('Redis error: ', error);
});

module.exports = {
  cacheManager: {
    get: async (key) => {
      try {
        const value = await new Promise((resolve, reject) => {
          client.get(key, (error, reply) => {
            if (error) return reject(error);
            resolve(reply);
          });
        });
        return value;
      } catch (error) {
        console.error('Error getting data from cache:', error);
        throw error;
      }
    },
    setex: async (key, value, ttl = cacheTTL) => {
      try {
        await new Promise((resolve, reject) => {
          client.setex(key, ttl, value, (error) => {
            if (error) return reject(error);
            resolve();
          });
        });
      } catch (error) {
        console.error('Error setting data to cache:', error);
        throw error;
      }
    },
  },
};

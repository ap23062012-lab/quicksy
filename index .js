const express = require('express');
const { Client } = require('pg');
const redis = require('redis');

const app = express();

// PostgreSQL connection
const pgClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'quicksy',
  password: 'postgres123',
  port: 5432,
});

pgClient.connect()
  .then(() => console.log('PostgreSQL Connected ✅'))
  .catch(err => console.error('PostgreSQL Error ❌', err));

// Redis connection
const redisClient = redis.createClient();

redisClient.connect()
  .then(() => console.log('Redis Connected ✅'))
  .catch(err => console.error('Redis Error ❌', err));

// Test route
app.get('/', async (req, res) => {
  try {
    await redisClient.set('msg', 'Hello from Redis!');
    const value = await redisClient.get('msg');

    res.send('PostgreSQL + Redis Connected 🚀: ' + value);
  } catch (err) {
    res.send('Error ❌: ' + err.message);
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
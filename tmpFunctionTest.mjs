import { handler } from './netlify/functions/weather-ai.js';
const event = {
  httpMethod: 'GET',
  queryStringParameters: {
    path: '/weather',
    lat: '-1.2921',
    lon: '36.8219',
    days: '7',
    units: 'metric',
    ai: 'true',
  },
  headers: {
    'content-type': 'application/json',
  },
};
const result = await handler(event);
console.log(JSON.stringify(result, null, 2));

import { URLSearchParams } from 'url';

const API_BASE_URL = 'https://api.weather-ai.co/v1';

const cleanHeaders = (headers) => {
  const cleaned = {};
  for (const [key, value] of Object.entries(headers || {})) {
    const lower = key.toLowerCase();
    if (['host', 'content-length'].includes(lower)) continue;
    cleaned[lower] = value;
  }
  return cleaned;
};

export const handler = async (event) => {
  const apiKey = process.env.VITE_WEATHER_AI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server is not configured with Weather-AI API key.' }),
    };
  }

  const path = event.queryStringParameters?.path;
  if (!path) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing path parameter for Weather-AI proxy.' }),
    };
  }

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(event.queryStringParameters || {})) {
    if (key === 'path') continue;
    if (value !== undefined) query.append(key, value);
  }

  const apiUrl = `${API_BASE_URL}${path}${query.toString() ? `?${query.toString()}` : ''}`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    ...cleanHeaders(event.headers),
  };

  let body;
  if (event.httpMethod !== 'GET' && event.body) {
    body = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;
  }

  try {
    const response = await fetch(apiUrl, {
      method: event.httpMethod,
      headers,
      body,
    });

    const responseText = await response.text();
    const contentType = response.headers.get('content-type') || 'application/json';

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': contentType,
      },
      body: responseText,
    };
  } catch (error) {
    console.error('Weather-AI proxy error:', error);
    return {
      statusCode: 502,
      body: JSON.stringify({ message: 'Weather-AI proxy network error.' }),
    };
  }
};

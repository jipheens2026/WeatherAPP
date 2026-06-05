import axios from 'axios';

const API_BASE_URL = 'https://api.weather-ai.co/v1';
const API_KEY = import.meta.env.VITE_WEATHER_AI_API_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export const weatherAPI = {
  // Get weather data with AI summary
  getWeather: async (lat, lon, days = 7, units = 'metric') => {
    const response = await apiClient.get('/weather', {
      params: { lat, lon, days, units, ai: true },
    });
    return response.data;
  },

  // Get current weather only
  getCurrent: async (lat, lon, units = 'metric') => {
    const response = await apiClient.get('/current', {
      params: { lat, lon, units },
    });
    return response.data;
  },

  // Get hourly forecast
  getHourly: async (lat, lon, units = 'metric') => {
    const response = await apiClient.get('/hourly', {
      params: { lat, lon, units },
    });
    return response.data;
  },

  // Get daily forecast
  getDaily: async (lat, lon, days = 7, units = 'metric') => {
    const response = await apiClient.get('/daily', {
      params: { lat, lon, days, units },
    });
    return response.data;
  },

  // Analyze trees from image
  analyzeTreesImage: async (formData) => {
    const response = await apiClient.post('/trees/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get tree analysis history
  getTreeHistory: async () => {
    const response = await apiClient.get('/trees/history');
    return response.data;
  },

  // Get API usage stats
  getUsage: async () => {
    const response = await apiClient.get('/usage');
    return response.data;
  },
};

export default weatherAPI;

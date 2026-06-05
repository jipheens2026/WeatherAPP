import { useState, useEffect } from 'react';
import { weatherAPI } from '../api/weatherAPI';
import WeatherCard from './WeatherCard';
import ForecastChart from './ForecastChart';

const CITIES = [
  { name: 'Nairobi, Kenya', lat: -1.2921, lon: 36.8219 },
  { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
  { name: 'New York, USA', lat: 40.7128, lon: -74.0060 },
  { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093 },
];

const WeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customLat, setCustomLat] = useState('');
  const [customLon, setCustomLon] = useState('');

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherAPI.getWeather(lat, lon, 7, 'metric');
      setWeatherData(data);
    } catch (err) {
      const status = err.response?.status;
      const serverMessage = err.response?.data?.message || err.response?.statusText;
      const message = serverMessage
        ? `Weather API error ${status}: ${serverMessage}`
        : err.message || 'Failed to fetch weather data. Please check your API key and redeploy when updated.';
      setError(message);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    fetchWeather(city.lat, city.lon);
  };

  useEffect(() => {
    fetchWeather(selectedCity.lat, selectedCity.lon);
  }, []);

  const handleCustomLocation = (e) => {
    e.preventDefault();
    const lat = parseFloat(customLat);
    const lon = parseFloat(customLon);
    
    if (isNaN(lat) || isNaN(lon)) {
      setError('Please enter valid latitude and longitude values');
      return;
    }
    
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setError('Latitude must be between -90 and 90, longitude between -180 and 180');
      return;
    }

    setSelectedCity({ name: `Custom (${lat}, ${lon})`, lat, lon });
    fetchWeather(lat, lon);
  };

  return (
    <div className="space-y-6">
      {/* Location Selector */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Select Location</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          {CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => handleCitySelect(city)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCity.name === city.name
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {city.name.split(',')[0]}
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Custom Coordinates</h3>
          <form onSubmit={handleCustomLocation} className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Latitude (e.g., -1.2921)"
              value={customLat}
              onChange={(e) => setCustomLat(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Longitude (e.g., 36.8219)"
              value={customLon}
              onChange={(e) => setCustomLon(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get Weather
            </button>
          </form>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">⚠️ {error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Fetching weather data...</p>
        </div>
      )}

      {/* Weather Data */}
      {weatherData && !loading && (
        <>
          <WeatherCard data={weatherData} location={selectedCity.name} />
          <ForecastChart data={weatherData} />
        </>
      )}

      {/* Initial State */}
      {!weatherData && !loading && !error && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-600 text-lg">
            👆 Select a city or enter custom coordinates to view weather data
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;

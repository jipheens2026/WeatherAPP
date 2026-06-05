const WeatherCard = ({ data, location }) => {
  if (!data) return null;

  const { current, ai_summary, hourly } = data;
  
  // Get condition name from code
  const getConditionName = (code) => {
    const conditions = {
      '0': 'Clear',
      '1': 'Mainly Clear',
      '2': 'Partly Cloudy',
      '3': 'Overcast',
      '45': 'Foggy',
      '48': 'Foggy',
      '51': 'Light Drizzle',
      '53': 'Moderate Drizzle',
      '55': 'Dense Drizzle',
      '61': 'Slight Rain',
      '63': 'Moderate Rain',
      '65': 'Heavy Rain',
      '71': 'Slight Snow',
      '73': 'Moderate Snow',
      '75': 'Heavy Snow',
      '95': 'Thunderstorm',
    };
    return conditions[code] || 'N/A';
  };

  // Get humidity and feels_like from hourly data if not in current
  const currentHumidity = current?.humidity || hourly?.[0]?.humidity || 0;
  const currentFeelsLike = current?.feels_like || hourly?.[0]?.feels_like || current?.temperature || 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{location}</h2>
          <p className="text-gray-600">Current Conditions</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-blue-600">
            {Math.round(current?.temperature || 0)}°C
          </div>
          <p className="text-gray-600 mt-1 capitalize">
            {getConditionName(current?.condition_code)}
          </p>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Feels Like</p>
          <p className="text-xl font-semibold text-gray-800">
            {Math.round(currentFeelsLike)}°C
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="text-xl font-semibold text-gray-800">
            {currentHumidity}%
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Wind Speed</p>
          <p className="text-xl font-semibold text-gray-800">
            {current?.wind_speed || 0} m/s
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Wind Direction</p>
          <p className="text-xl font-semibold text-gray-800">
            {current?.wind_direction || 0}°
          </p>
        </div>
      </div>

      {/* AI Summary */}
      {ai_summary && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-5 border border-purple-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🤖</span>
            <h3 className="font-semibold text-gray-800">AI Weather Summary (Powered by Gemini)</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{ai_summary}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;

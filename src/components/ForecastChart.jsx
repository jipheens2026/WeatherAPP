import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ForecastChart = ({ data }) => {
  if (!data || !data.daily) return null;

  const getConditionName = (code) => {
    const conditions = {
      '0': 'Clear',
      '1': 'Mainly Clear',
      '2': 'Partly Cloudy',
      '3': 'Overcast',
      '45': 'Foggy',
      '61': 'Rain',
      '71': 'Snow',
      '95': 'Thunderstorm',
    };
    return conditions[code] || 'N/A';
  };

  const chartData = data.daily.map((day, index) => ({
    day: day.date ? new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : `Day ${index + 1}`,
    high: Math.round(day.temperature_max || 0),
    low: Math.round(day.temperature_min || 0),
    precipitation: day.precipitation_sum || day.precipitation || 0,
    condition: getConditionName(day.condition_code),
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">7-Day Forecast</h2>

      {/* Forecast Cards */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-8">
        {chartData.map((day, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-1">{day.day}</p>
            <p className="text-2xl font-bold text-blue-600">{day.high}°</p>
            <p className="text-sm text-gray-600">{day.low}°</p>
            <p className="text-xs text-gray-500 mt-1 capitalize truncate">{day.condition}</p>
          </div>
        ))}
      </div>

      {/* Temperature Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Temperature Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} name="High" />
            <Line type="monotone" dataKey="low" stroke="#3b82f6" strokeWidth={2} name="Low" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Precipitation Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Precipitation Forecast</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis label={{ value: 'Precipitation (mm)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="precipitation" fill="#60a5fa" name="Precipitation (mm)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;

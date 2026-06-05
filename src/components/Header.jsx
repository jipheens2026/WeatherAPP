import { useState } from 'react';

const Header = () => {
  const [showApiInfo, setShowApiInfo] = useState(false);

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Weather-AI Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Advanced Weather Intelligence & Agricultural Analysis
            </p>
          </div>
          <button
            onClick={() => setShowApiInfo(!showApiInfo)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
          >
            ℹ️ API Info
          </button>
        </div>

        {showApiInfo && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">About This Dashboard</h3>
            <p className="text-sm text-blue-800 mb-2">
              This application integrates with the Weather-AI platform, showcasing:
            </p>
            <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
              <li><strong>Weather Intelligence:</strong> Real-time weather data with AI-powered summaries via Gemini AI</li>
              <li><strong>Multi-day Forecasts:</strong> Up to 7-day weather predictions with detailed hourly breakdowns</li>
              <li><strong>Tree Analysis:</strong> Computer vision-powered tree counting and canopy health assessment</li>
              <li><strong>Agricultural Insights:</strong> AI-generated recommendations for farm management</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-blue-200 space-y-1">
              <p className="text-xs text-blue-700">
                API Base: <code className="bg-blue-100 px-1 rounded">https://api.weather-ai.co/v1</code>
              </p>
              <p className="text-xs text-blue-700">
                Docs: <a href="https://weather-ai.co/docs" target="_blank" rel="noreferrer" className="underline">https://weather-ai.co/docs</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

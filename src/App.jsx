import { useState } from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import TreeAnalysis from './components/TreeAnalysis';
import Header from './components/Header';

function App() {
  const [activeTab, setActiveTab] = useState('weather');

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1 inline-flex">
            <button
              onClick={() => setActiveTab('weather')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'weather'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🌤️ Weather Intelligence
            </button>
            <button
              onClick={() => setActiveTab('trees')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'trees'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🌳 Tree Analysis
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="transition-all">
          {activeTab === 'weather' && <WeatherDashboard />}
          {activeTab === 'trees' && <TreeAnalysis />}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-white text-sm">
        <p>Built with ❤️ using Weather-AI API | Developed by Jipheens Wahome</p>
      </footer>
    </div>
  );
}

export default App;

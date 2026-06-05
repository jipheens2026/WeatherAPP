import { useState } from 'react';
import { weatherAPI } from '../api/weatherAPI';

const TreeAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    farmerId: '',
    county: '',
    landAcres: '',
    location: '',
    notes: '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image/(jpeg|png|webp)')) {
        setError('Please upload a JPEG, PNG, or WEBP image');
        return;
      }

      // Validate file size (max 20MB)
      if (file.size > 20 * 1024 * 1024) {
        setError('File size must be less than 20MB');
        return;
      }

      setSelectedFile(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', selectedFile);
      
      if (formData.farmerId) formDataToSend.append('farmerId', formData.farmerId);
      if (formData.county) formDataToSend.append('county', formData.county);
      if (formData.landAcres) formDataToSend.append('landAcres', formData.landAcres);
      if (formData.location) formDataToSend.append('location', formData.location);
      if (formData.notes) formDataToSend.append('notes', formData.notes);

      const data = await weatherAPI.analyzeTreesImage(formDataToSend);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze image. Please check your API key and try again.');
      console.error('Tree analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setFormData({
      farmerId: '',
      county: '',
      landAcres: '',
      location: '',
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🌳 Tree Canopy Analysis</h2>
        <p className="text-gray-600 mb-6">
          Upload a drone, aerial, or satellite image of your farm to automatically count trees,
          assess canopy health, and receive AI-powered agronomic recommendations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Farm Image * (JPEG, PNG, or WEBP - max 20MB)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-green-500 transition-colors">
              <div className="space-y-1 text-center">
                {preview ? (
                  <div className="relative">
                    <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded" />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreview(null);
                      }}
                      className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">JPEG, PNG, WEBP up to 20MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farmer ID
              </label>
              <input
                type="text"
                name="farmerId"
                value={formData.farmerId}
                onChange={handleInputChange}
                placeholder="e.g., F-001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                County/Region
              </label>
              <input
                type="text"
                name="county"
                value={formData.county}
                onChange={handleInputChange}
                placeholder="e.g., Bomet"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Land Size (acres)
              </label>
              <input
                type="number"
                name="landAcres"
                value={formData.landAcres}
                onChange={handleInputChange}
                placeholder="e.g., 2.5"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location/Farm Name
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Kapkimolwa Farm, Block C"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="e.g., Tea plantation, recently pruned"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">⚠️ {error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                loading || !selectedFile
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                '🔬 Analyze Trees'
              )}
            </button>
            {result && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                New Analysis
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Analysis Results</h2>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Trees</p>
              <p className="text-3xl font-bold text-green-600">{result.total_tree_count}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Density (per acre)</p>
              <p className="text-3xl font-bold text-blue-600">
                {result.tree_density_per_acre ? result.tree_density_per_acre.toFixed(1) : 'N/A'}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Canopy Coverage</p>
              <p className="text-3xl font-bold text-purple-600">
                {result.canopy_coverage_pct ? `${result.canopy_coverage_pct.toFixed(1)}%` : 'N/A'}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Confidence</p>
              <p className="text-3xl font-bold text-yellow-600">
                {result.confidence_score ? `${(result.confidence_score * 100).toFixed(0)}%` : 'N/A'}
              </p>
            </div>
          </div>

          {/* Tree Health */}
          {result.tree_health && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-800 mb-3">🌱 Tree Health Distribution</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{result.tree_health.healthy}</div>
                  <div className="text-sm text-gray-600">Healthy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{result.tree_health.needs_care}</div>
                  <div className="text-sm text-gray-600">Needs Care</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{result.tree_health.needs_replacement}</div>
                  <div className="text-sm text-gray-600">Needs Replacement</div>
                </div>
              </div>
            </div>
          )}

          {/* AI Observations */}
          {result.observations && result.observations.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-800 mb-3">🔍 AI Observations</h3>
              <ul className="space-y-2">
                {result.observations.map((obs, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-gray-800 mb-3">💡 Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Image Overlays */}
          {result.overlay_image_url && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">📸 Annotated Image</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.original_image_url && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Original</p>
                    <img
                      src={result.original_image_url}
                      alt="Original"
                      className="w-full rounded-lg border border-gray-300"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Tree Detection Overlay</p>
                  <img
                    src={result.overlay_image_url}
                    alt="Overlay"
                    className="w-full rounded-lg border border-gray-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          {result.tree_species_guess && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Detected Species:</strong> {result.tree_species_guess}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeAnalysis;

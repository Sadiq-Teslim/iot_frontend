import { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from './components/StatCard';
import AnalyticsChart from './components/AnalyticsChart';
import DataTable from './components/DataTable';

// --- New TypeScript Type Definitions ---

// Type for a single row of raw sensor data
interface SensorDataRow {
  timestamp: string;
  sensor_id: string;
  temperature: number;
  humidity: number;
}

// Interface for the entire API response payload
interface AnalyticsData {
  total_records: number;
  average_temp: number;
  max_temp: number;
  min_temp: number;
  average_humidity: number;
  records_per_sensor: { [key: string]: number };
  raw_data: SensorDataRow[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1/analytics';

function App() {
  // State is now typed: it can be AnalyticsData or null
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tell axios what kind of data to expect for full type safety
        const response = await axios.get<AnalyticsData>(API_URL);
        setAnalytics(response.data);
        setError(null);
      } catch (err) {
        setError("Could not connect to the backend. Please ensure it's running and CORS is configured.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">IoT Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Live insights from our simulated sensor network.</p>
        </header>

        {analytics && (
          <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Average Temp" value={analytics.average_temp} unit="°C" />
              <StatCard title="Max Temp" value={analytics.max_temp} unit="°C" />
              <StatCard title="Average Humidity" value={analytics.average_humidity} unit="%" />
              <StatCard title="Total Records" value={analytics.total_records} />
            </div>

            <div className="mt-6">
              <AnalyticsChart data={analytics.records_per_sensor} />
            </div>

            <DataTable data={analytics.raw_data} />
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
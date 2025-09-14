import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the shape of the data prop
type AnalyticsChartProps = {
  data: { [key: string]: number } | null;
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  // Recharts expects data as an array of objects. We format it here.
  const chartData = data
    ? Object.keys(data).map((key) => ({
        name: key,
        count: data[key],
      }))
    : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Records Per Sensor</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip wrapperClassName="!bg-white !border-gray-300 !rounded-md" />
          <Legend />
          <Bar dataKey="count" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
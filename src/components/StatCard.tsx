import React from 'react';

// Define the type for the component's props
type StatCardProps = {
  title: string;
  value: number;
  unit?: string; // The '?' makes this prop optional
};

const StatCard: React.FC<StatCardProps> = ({ title, value, unit = '' }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
      <h3 className="text-md font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
      <p className="text-4xl font-bold text-gray-800 mt-2">
        {value}
        {unit && <span className="text-xl font-medium text-gray-600 ml-1">{unit}</span>}
      </p>
    </div>
  );
};

export default StatCard;
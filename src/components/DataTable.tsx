import React from 'react';

// Define the type for a single row of sensor data
type SensorDataRow = {
  timestamp: string;
  sensor_id: string;
  temperature: number;
  humidity: number;
  // Use an index signature to allow for any other string keys
  [key: string]: string | number; 
};

// Define the props for the DataTable component
type DataTableProps = {
  data: SensorDataRow[] | null;
};

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const dataToShow = data ? data.slice(0, 10) : [];

  if (dataToShow.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Raw Sensor Data</h2>
        <p className="text-gray-500">Waiting for data...</p>
      </div>
    );
  }

  const headers = Object.keys(dataToShow[0]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Sensor Readings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header.replace('_', ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataToShow.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {headers.map((header) => (
                  <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
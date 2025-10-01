import React from 'react';
import { Line } from 'react-chartjs-2';

interface DashboardChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const DashboardChart: React.FC<DashboardChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Revenue Saved by Deposits',
        data: data.values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Revenue Saved by Deposits</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DashboardChart;
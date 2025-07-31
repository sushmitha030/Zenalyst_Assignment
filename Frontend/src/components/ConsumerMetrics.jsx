import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ConsumerMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalQ3Revenue: 0,
    totalQ4Revenue: 0,
    totalVariance: 0,
    topCustomersChartData: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartColors = [
    '#005fba', '#e52521', '#8dc7f0', '#f7a6b9', '#34a853',
    '#fbbc05', '#4285f4', '#ea4335', '#9e9e9e', '#673ab7'
  ];

  useEffect(() => {
    const fetchCustomerGrowth = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get-customer-growth-analysis');
        const data = response.data;

        // Calculate total Q3 Revenue, Q4 Revenue, and Variance
        let totalQ3 = 0;
        let totalQ4 = 0;
        let totalVar = 0;

        data.forEach(customer => {
          totalQ3 += customer['Quarter 3 Revenue'];
          totalQ4 += customer['Quarter 4 Revenue'];
          totalVar += customer['Variance'];
        });

        // Sort customers by Variance in descending order and get top 10
        const sortedCustomers = [...data].sort((a, b) => b['Variance'] - a['Variance']);
        const top10Customers = sortedCustomers.slice(0, 10);

        // Prepare data for the bar chart
        const labels = top10Customers.map(customer => customer['Customer Name']);
        const varianceValues = top10Customers.map(customer => customer['Variance']);

        setMetrics({
          totalQ3Revenue: totalQ3,
          totalQ4Revenue: totalQ4,
          totalVariance: totalVar,
          topCustomersChartData: {
            labels,
            datasets: [{
              data: varianceValues,
              backgroundColor: chartColors.slice(0, labels.length), // Use enough colors for top 10
              borderRadius: 4,
              barThickness: 30,
            }],
          },
        });
      } catch (err) {
        console.error('Error fetching customer growth data:', err);
        setError('Failed to load customer growth data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerGrowth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-gray-700">Loading customer metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline ml-2">{error}</span>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Top 10 Customers by Variance (Q3 to Q4)',
        font: { size: 18, weight: 'bold' },
        color: '#333',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Variance: ${formatCurrency(context.raw)}`,
        },
        backgroundColor: 'rgba(0,0,0,0.7)',
        bodyFont: { size: 14 },
        titleFont: { size: 16, weight: 'bold' },
        padding: 10,
        cornerRadius: 6,
      },
      datalabels: {
        display: false, // <-- Explicitly turn off data labels
      },
      // Removed datalabels plugin configuration to avoid conflicts
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Variance',
          font: { size: 14, weight: 'bold' },
          color: '#555',
        },
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          },
          font: { size: 12 },
          color: '#666',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: 'Customer Name',
          font: { size: 14, weight: 'bold' },
          color: '#555',
        },
        ticks: {
          font: { size: 12 },
          color: '#666',
        },
      },
    },
  };

  return (
    <div className="font-inter antialiased bg-gray-50 text-gray-800 p-6 sm:p-8 md:p-10 min-h-screen">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-6 md:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-8">
          Customer Growth Analysis
        </h1>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Total Q3 Revenue</h2>
            <p className="text-3xl font-bold text-blue-900">
              {formatCurrency(metrics.totalQ3Revenue)}
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-semibold text-green-700 mb-2">Total Q4 Revenue</h2>
            <p className="text-3xl font-bold text-green-900">
              {formatCurrency(metrics.totalQ4Revenue)}
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">Total Variance</h2>
            <p className="text-3xl font-bold text-purple-900">
              {formatCurrency(metrics.totalVariance)}
            </p>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <div className="w-full h-[450px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
            {metrics.topCustomersChartData ? (
              <Bar data={metrics.topCustomersChartData} options={barChartOptions} />
            ) : (
              <p className="text-gray-600">No chart data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerMetrics;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels
);

function RevenueCharts() {
  const [chartData, setChartData] = useState(null);

  const chartColors = [
    '#005fba', '#e52521', '#8dc7f0', '#f7a6b9', '#34a853',
    '#fbbc05', '#4285f4', '#ea4335', '#9e9e9e', '#673ab7'
  ];

  useEffect(() => {
    const fetchTopCountries = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8081/api/top-countries-by-revenue?n=10'
        );
        const data = response.data;
        const totalRevenue = data.reduce(
          (acc, curr) => acc + curr['Yearly Revenue'],
          0
        );

        const labels = data.map((item) => item.Country);
        const revenueValues = data.map((item) => item['Yearly Revenue']);
        const revenueShare = data.map((item) =>
          ((item['Yearly Revenue'] / totalRevenue) * 100).toFixed(2)
        );

        setChartData({
          labels,
          revenueValues,
          revenueShare,
        });

      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchTopCountries();
  }, []);

  if (!chartData) {
    return <p>Loading charts...</p>;
  }

  const barData = {
    labels: chartData.labels,
    datasets: [{
      data: chartData.revenueValues,
      backgroundColor: chartColors,
      borderRadius: 4,
      barThickness: 30,
    }],
  };

  const pieData = {
    labels: chartData.labels,
    datasets: [{
      data: chartData.revenueShare,
      backgroundColor: chartColors,
      borderWidth: 1,
    }],
  };

  return (
    <div style={{ width: '100%', padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
        {/* --- Bar Chart --- */}
        <div style={{ width: '600px', height: '400px', padding: '10px' }}>
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: `Top ${chartData.labels.length} Countries by Revenue`,
                  font: { size: 16 }
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `Revenue: $${Number(context.raw).toLocaleString()}`,
                  },
                },
                datalabels: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Revenue',
                    font: { size: 14 }
                  }
                },
                x: {
                  grid: { display: false },
                  // ADD THIS to display the x-axis label (Country)
                  title: {
                    display: true,
                    text: 'Country',
                    font: { size: 14 }
                  }
                },
              },
            }}
          />
        </div>

        {/* --- Pie Chart --- */}
        <div style={{ width: '600px', height: '400px', padding: '10px' }}>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: `Revenue Share by Country (Top ${chartData.labels.length})`,
                  font: { size: 16 }
                },
                legend: {
                  position: 'right',
                  labels: { usePointStyle: true, pointStyle: 'circle' }
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${context.parsed.toFixed(2)}%`,
                  },
                },
                datalabels: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RevenueCharts;
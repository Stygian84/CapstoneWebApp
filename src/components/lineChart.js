import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const ctx = document.getElementById('myChart');
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(item => item.timestamp), // Assuming timestamp is available in your data
          datasets: [{
            label: 'Data',
            data: data.map(item => item.value), // Assuming 'value' is the data point you want to plot
            borderColor: 'blue',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time', // Specify the type of x-axis if using timestamps
              time: {
                unit: 'day' // Adjust according to your data's granularity
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });

      setChart(newChart);
    }
  }, [data]);

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default LineChart;

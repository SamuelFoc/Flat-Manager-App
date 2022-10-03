import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
          font: {
            // Add your font here to change the font of your legend label
            size: 22,
            weight: "bold",
          },
        },
        tooltip: {
          bodyFont: {
            family: "Montserrat", // Add your font here to change the font of your tooltip body
          },
          titleFont: {
            family: "Montserrat", // Add your font here to change the font of your tooltip title
          },
        },
      },
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    scales: {
      yAxes: {
        barPercentage: 1.6,
        grid: {
          display: false,
          color: "white",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 125000,
          padding: 2,
          backdropPadding: 2,
          backdropColor: "rgba(255,255,255,1)",
          color: "white",
          font: {
            family: "Montserrat", // Add your font here to change the font of your y axis
            size: 16,
          },
          major: {
            enable: true,
          },
        },
      },
      xAxes: {
        barPercentage: 1.6,
        grid: {
          display: false,
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          color: "white",
          font: {
            family: "Montserrat", // Add your font here to change the font of your x axis
            size: 16,
          },

          major: {
            enable: false,
          },
        },
      },
    },
  };

  return <Bar className="chartBox" data={chartData} options={options} />;
};

export default BarChart;

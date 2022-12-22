import React from "react"
import { Bar } from "react-chartjs-2"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AgeBracketChart = () => {
  const data = {
    labels: ["21-35", "36-45", "46-55", "56-65"],
    datasets: [
      {
        label: "Male",
        backgroundColor: "rgba(57, 157, 253, 0.8)",
        borderColor: "rgba(57, 157, 253, 0.8)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(57, 157, 253, 0.9)",
        hoverBorderColor: "rgba(57, 157, 253, 0.9)",
        data: [17, 30, 24, 16],
      },
      {
        label: "Female",
        backgroundColor: "rgba(245, 59, 102, 0.8)",
        borderColor: "rgba(245, 59, 102, 0.8)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 59, 102, 0.9)",
        hoverBorderColor: "rgba(245, 59, 102, 0.9)",
        data: [23, 22, 34, 38],
      },
    ],
  }

  const option = {
    responsive: true,
    indexAxis: 'y',
    barPercentage: 0.3,
    scales: {
      x: {
          stacked: true,
      },
      y: {
          stacked: true,
      },
    },
    layout: {
      padding: {
        bottom: 0,
        top: 0
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#91929b',
        padding: 20
      }
    }
  }

  return <Bar width={400} height={305} data={data} options={option}/>
}

export default AgeBracketChart
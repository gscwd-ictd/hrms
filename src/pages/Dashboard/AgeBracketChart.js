import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const AgeBracketChart = () => {
  const data = {
    labels: ['20-29', '30-39', '40-49', '50-59', '60-up'],
    datasets: [
      {
        label: 'Male',
        backgroundColor: 'rgba(57, 157, 253, 0.8)',
        borderColor: 'rgba(57, 157, 253, 0.8)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(57, 157, 253, 0.9)',
        hoverBorderColor: 'rgba(57, 157, 253, 0.9)',
        data: [30, 17, 24, 16, 5],
      },
      {
        label: 'Female',
        backgroundColor: 'rgba(245, 59, 102, 0.8)',
        borderColor: 'rgba(245, 59, 102, 0.8)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(245, 59, 102, 0.9)',
        hoverBorderColor: 'rgba(245, 59, 102, 0.9)',
        data: [23, 20, 34, 38, 3],
      },
    ],
  }

  const option = {
    responsive: true,
    indexAxis: 'y',
    barPercentage: 0.5,
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
        top: 0,
      },
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#91929b',
        padding: 20,
      },
    },
  }

  return <Bar width={400} height={230} data={data} options={option} />
}

export default AgeBracketChart

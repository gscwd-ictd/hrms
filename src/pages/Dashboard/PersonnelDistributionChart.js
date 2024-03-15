import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const PersonnelDistributionChart = () => {
  const data = {
    labels: [
      'OGM',
      'HRD',
      'GSPMMD',
      'ICTD',
      'AFMD',
      'CSD',
      'PSD',
      'PAMD',
      'ECD',
    ],
    datasets: [
      {
        label: 'Male',
        backgroundColor: 'rgba(57, 157, 253, 0.8)',
        borderColor: 'rgba(57, 157, 253, 0.8)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(57, 157, 253, 0.9)',
        hoverBorderColor: 'rgba(57, 157, 253, 0.9)',
        data: [9, 8, 10, 16, 13, 10, 25, 20, 15],
      },
      {
        label: 'Female',
        backgroundColor: 'rgba(245, 59, 102, 0.8)',
        borderColor: 'rgba(245, 59, 102, 0.8)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(245, 59, 102, 0.9)',
        hoverBorderColor: 'rgba(245, 59, 102, 0.9)',
        data: [2, 8, 7, 3, 28, 25, 15, 5, 9],
      },
    ],
  }

  // config
  const option = {
    responsive: true,
    barPercentage: 0.5,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
        grace: 1,
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

  return (
    <React.Fragment>
      <Bar width={474} height={210} data={data} options={option} />
    </React.Fragment>
  )
}

export default PersonnelDistributionChart

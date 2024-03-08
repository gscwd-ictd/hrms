import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const NatureOfAppointmentChart = () => {
  const data = {
    labels: ['Contract of Service', 'Job Order', 'Casual', 'Permanent'],
    datasets: [
      {
        label: '# of Employees',
        data: [50, 18, 21, 249],

        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      },
    ],
  }

  const option = {
    responsive: true,
    indexAxis: 'y',
    barPercentage: 0.3,
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
        padding: 10,
      },
    },
  }

  return <Doughnut width={400} height={305} data={data} options={option} />
}

export default NatureOfAppointmentChart

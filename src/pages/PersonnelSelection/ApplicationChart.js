import React from "react"
import { Bar } from "react-chartjs-2"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

const ApplicationChart = () => {
  const data = {
    labels: [
      "Total Applicants",
      "Qualified Applicants",
      "Interviewed Applicants",
      "Hired Applicants",
    ],
    datasets: [
      {
        label: "Applicants",
        backgroundColor: "rgba(57, 157, 253, 0.8)",
        borderColor: "rgba(57, 157, 253, 0.8)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(57, 157, 253, 0.9)",
        hoverBorderColor: "rgba(57, 157, 253, 0.9)",
        data: [20, 8, 7, 2],
      },
    ],
  }

  const option = {
    responsive: true,
    barPercentage: 0.4,
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
      position: "bottom",
      labels: {
        fontColor: "#91929b",
        padding: 20,
      },
    },
  }

  return (
    <React.Fragment>
      <Bar width={474} height={395} data={data} options={option} />
    </React.Fragment>
  )
}

export default ApplicationChart

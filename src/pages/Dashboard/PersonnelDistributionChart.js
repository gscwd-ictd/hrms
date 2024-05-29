import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPersonnelDistribution } from 'store/actions'

import { Bar } from 'react-chartjs-2'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import { Chart, registerables } from 'chart.js'
import { isEmpty } from 'lodash'

Chart.register(...registerables)

const PersonnelDistributionChart = () => {
  const dispatch = useDispatch()

  const [maleDataset, setMaleDataset] = useState([])
  const [femaleDataset, setFemaleDataset] = useState([])

  const { personnelDistributaion, isLoading, error } = useSelector(state => ({
    personnelDistributaion: state.Dashboard.personnelDistributaion,
    isLoading: state.Dashboard.loading.loadingPersonnelDistributaion,
    error: state.Dashboard.error.errorPersonnelDistributaion,
  }))

  // set data set for right gender
  const setGenderDataset = (datsets, gender) => {
    if (!isEmpty(datsets)) {
      datsets.find(dataset => {
        if (dataset.label === gender) {
          // return dataset
          if (gender === 'Male') {
            setMaleDataset(dataset.data)
          } else {
            setFemaleDataset(dataset.data)
          }
        }
      })
    }
  }

  // chart data
  const data = {
    labels: personnelDistributaion.labels || [],
    datasets: [
      {
        label: 'Male',
        backgroundColor: 'rgba(57, 157, 253, 0.8)',
        borderColor: 'rgba(57, 157, 253, 0.8)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(57, 157, 253, 0.9)',
        hoverBorderColor: 'rgba(57, 157, 253, 0.9)',
        data: maleDataset,
      },
      {
        label: 'Female',
        backgroundColor: 'rgba(245, 59, 102, 0.8)',
        borderColor: 'rgba(245, 59, 102, 0.8)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(245, 59, 102, 0.9)',
        hoverBorderColor: 'rgba(245, 59, 102, 0.9)',
        data: femaleDataset,
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

  useEffect(() => {
    dispatch(fetchPersonnelDistribution())
  }, [])

  useEffect(() => {
    if (!isEmpty(personnelDistributaion)) {
      setGenderDataset(personnelDistributaion.datasets, 'Male')
      setGenderDataset(personnelDistributaion.datasets, 'Female')
    }
  }, [personnelDistributaion])

  return (
    <>
      {error ? (
        <ToastrNotification toastType={'error'} notifMessage={error} />
      ) : null}

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Bar width={474} height={210} data={data} options={option} />
      )}
    </>
  )
}

export default PersonnelDistributionChart

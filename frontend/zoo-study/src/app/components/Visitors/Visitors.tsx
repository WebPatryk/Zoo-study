'use client';
import type { NextPage } from 'next';
import styles from './Visitors.module.scss';
import { useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);

const Visitors: NextPage = ({ visitorsData }) => {
  const [chartData, setChartData] = useState({
    labels: visitorsData.map(data => data.year),

    datasets: [
      {
        label: 'Users Gained',
        data: visitorsData.map(data => data.userGain),
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#f0331a',
          '#f3ba2f',
          '#2a71d0'
        ],
        borderColor: 'black',
        borderWidth: 2
      }
    ]
  });
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Zoo's Visitors</h3>
      <Bar
        className={styles.chart}
        data={chartData as any}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Users Gained between 2016-2020'
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default Visitors;

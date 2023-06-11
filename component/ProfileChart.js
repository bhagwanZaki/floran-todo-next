"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import styles from "../css/chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ProfileChart() {
  const opt = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        // ticks: {
        //   display: false, //this will remove only the label
        // },
      },
      y: {
        grid: { 
          color: "#69696989"
         },
        position: "right",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const labels = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];
  const ata = {
    labels,
    datasets: [
      {
        data: [
          13, 15, 3, 16, 11, 12, 6, 14, 2, 7, 19, 9, 3, 9, 14, 11, 4, 10, 20,
          13, 12, 10, 2, 7, 10, 19, 9, 9, 2, 15, 4,
        ],
        backgroundColor: [
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(126, 128, 111, 1)",
          "rgba(236, 112, 22, 1)",
        ],
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 10,
      },
    ],
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerBody}>
        <Bar options={opt} data={ata} />
      </div>
    </div>
  );
}

export default ProfileChart;

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

function ProfileChart({label,data}) {
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

  var labels = []
  var bg = []
  var date = new Date()
  for (var i of label){
    labels.push(`${i}/${date.getMonth()+1}`)
    bg.push("rgba(126, 128, 111, 1)")
  }
  bg[bg.length-1] = "rgba(236, 112, 22, 1)"
  
  const ata = {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: bg,
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

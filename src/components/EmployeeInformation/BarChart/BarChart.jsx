import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const countStatus = (status) => {
    let count = 0;
    props.employees.forEach((employee) => {
      employee.attendances.forEach((attendance) => {
        if (attendance.status === status) {
          count++;
        }
      });
    });
    return count;
  };

  // Data untuk Bar Chart
  const chartData = {
    labels: ["Sick", "On Leave", "On Project", "In the Office"],
    datasets: [
      {
        label: "Employee Attendance",
        data: [
          countStatus("sick"),
          countStatus("on leave"),
          countStatus("on project"),
          countStatus("in the office"),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
      },
    ],
  };
  return (
    <Bar
      data={chartData}
      options={{
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
            maxTicksLimit: 10,
          },
        },
      }}
    />
  );
};

export default BarChart;

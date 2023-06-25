import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import moment from "moment";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const getRandomColor = () => {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#999950",
    "#4A192C",
    "#FAD201",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Chartjs = (props) => {
  // Mengambil data absen dengan status "in the office" dari data JSON
  const officeAttendances = props.employees.reduce((acc, employee) => {
    const inOfficeAttendances = employee.attendances.filter(
      (attendance) => attendance.status === "in the office"
    );
    return [...acc, ...inOfficeAttendances];
  }, []);

  // Mengelompokkan data absen berdasarkan tanggal
  const attendanceByDate = officeAttendances.reduce((acc, attendance) => {
    const date = moment(attendance.date, "YYYY-MM-DD").format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = 1;
    } else {
      acc[date]++;
    }
    return acc;
  }, {});

  // Mengubah data absen menjadi format yang dapat digunakan oleh Chart.js
  const chartData = {
    labels: Object.keys(attendanceByDate),
    datasets: [
      {
        label: "Attendance In The Office",
        data: Object.values(attendanceByDate),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  // Konfigurasi opsi Chart.js
  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex;
            const date = context.chart.data.labels[dataIndex];
            let selectedEmployee = [];
            officeAttendances.forEach((employee) => {
              if (employee.date === date) {
                const temp = props.employees.filter(
                  (e) => e.id === employee.IdUser
                );
                selectedEmployee.push(temp[0].name);
              }
            });
            const finalEmployee = selectedEmployee.join(", ");
            return finalEmployee;
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: props.filterOption === "daily" ? "day" : "month",
          displayFormats: {
            day: "MMM D",
          },
        },
      },
      y: {
        beginAtZero: true,
        display: true,
        position: "left",
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default Chartjs;

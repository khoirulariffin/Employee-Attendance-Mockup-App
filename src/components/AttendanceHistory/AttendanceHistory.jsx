import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/actions/employeeActions";
import Loading from "../Loading/Loading";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AttendanceHistory = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  const [isLoading, setIsLoading] = useState(true);

  let totalEmployeeAttendance = [];

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  useEffect(() => {
    employees.length !== 0 && setIsLoading(false);
  }, [employees]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading) {
    employees.forEach((e) => {
      totalEmployeeAttendance = totalEmployeeAttendance.concat(e.attendances);
    });
    console.log(totalEmployeeAttendance);
  }

  const data = {
    labels: totalEmployeeAttendance.map((e) => e.date),
    datasets: employees.map((employee, index) => ({
      label: `Employee ${index + 1} Attendance`,
      data: employee.attendances.map((e) => e),
      borderColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    })),
  };

  return (
    <section className="flex-auto w-full">
      <div className="bg-gray-500 flex flex-row items-center justify-between">
        <div className="w-2 bg-blue-300 h-full py-1">&nbsp;</div>
        <h1 className="text-white font-poppins text-sm">
          ATTENDANCE OFFICE HISTORY
        </h1>
        <div className="w-2 bg-blue-300 h-full py-1">&nbsp;</div>
      </div>
      <div>
        <Line data={data} />
      </div>
    </section>
  );
};

export default AttendanceHistory;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/actions/employeeActions";
import Loading from "../Loading/Loading";
import SelectOption from "../SelectOption/SelectOption";
import Chartjs from "./Chartjs/Chartjs";

const AttendanceHistory = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState("daily");

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
  }

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const options = [
    { value: "daily", display: "Daily" },
    { value: "monthly", display: "Monthly" },
  ];

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
        <SelectOption
          value={filterOption}
          onChange={handleFilterChange}
          options={options}
        />
        <Chartjs employees={employees} filterOption={filterOption} />
      </div>
    </section>
  );
};

export default AttendanceHistory;

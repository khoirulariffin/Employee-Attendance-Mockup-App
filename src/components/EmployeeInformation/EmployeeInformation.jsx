import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/actions/employeeActions";
import Loading from "../Loading/Loading";
import BarChart from "./BarChart/BarChart";

const EmployeeInformation = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  useEffect(() => {
    employees.length !== 0 && setIsLoading(false);
  }, [employees]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex-auto w-full">
      <div className="bg-gray-500 flex flex-row items-center justify-between">
        <div className="w-2 bg-blue-300 h-full py-1">&nbsp;</div>
        <h1 className="text-white font-poppins text-sm">
          EMPLOYEE INFORMATION
        </h1>
        <div className="w-2 bg-blue-300 h-full py-1">&nbsp;</div>
      </div>
      <div>
        <BarChart employees={employees} />
      </div>
    </section>
  );
};

export default EmployeeInformation;

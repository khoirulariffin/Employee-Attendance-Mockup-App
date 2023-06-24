import React from "react";
import AttendanceHistory from "../../components/AttendanceHistory/AttendanceHistory";
import EmployeeInformation from "../../components/EmployeeInformation/EmployeeInformation";

const RightLayout = () => {
  return (
    <section className="min-h-screen flex flex-col items-center">
      <AttendanceHistory />
      <EmployeeInformation />
    </section>
  );
};

export default RightLayout;

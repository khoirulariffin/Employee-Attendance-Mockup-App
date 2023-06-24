import React from "react";
import { not_found } from "../../assets";

const Error = () => {
  return (
    <section className="flex justify-center items-center min-h-screen flex-col">
      <img
        src={not_found}
        alt="Not Found"
        className="h-3/6 w-3/6 bg-slate-500 bg-transparent"
      />
      <h1 className="-mt-4 font-poppins text-center">
        So sorry, minimum screen resolution is 1280px.
      </h1>
    </section>
  );
};

export default Error;

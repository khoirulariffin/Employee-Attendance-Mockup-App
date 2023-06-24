import React from "react";
import Lottie from "lottie-react";
import { loading } from "../../assets";

const Loading = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <Lottie animationData={loading} loop className="h-40 w-40" />
    </section>
  );
};

export default Loading;

import React from "react";
import LeftLayout from "../LeftLayout/LeftLayout";
import RightLayout from "../RightLayout/RightLayout";

const Layout = () => {
  return (
    <main className="flex min-h-screen">
      <section className="flex-auto w-3/5 overflow-hidden">
        <LeftLayout />
      </section>
      <section className="flex-auto w-2/5">
        <RightLayout />
      </section>
    </main>
  );
};

export default Layout;

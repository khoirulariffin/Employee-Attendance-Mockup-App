import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Layout from "./pages/Layout/Layout";
import Error from "./components/error/Error";
import store from "./store";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const handleMediaQueryChange = (event) => {
      if (event.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return !isMobile ? (
    <Error />
  ) : (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

export default App;

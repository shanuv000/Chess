import React, { lazy, Suspense, useEffect, useState } from "react";
import { getIPAddress, addDataToFirebase } from "./ExtractIPs/ipfunc";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import Header from "./Components/Header";
import Contact from "./Components/Contact";
import WhatsAppSender from "./Components/Whatsapp";
const Home = lazy(() => import("./Pages/Home"));
const Admin = lazy(() => import("./Pages/Admin"));
const AboutMe = lazy(() => import("./Pages/AboutMe"));
function App() {
  const [sendData, setSendData] = useState({
    ip: "",
  });
  // Extracting IPs
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Hello, World!");
      fetchData();
    }, 10000);
    const fetchData = async () => {
      if (sendData.ip === "") {
        const ipData = await getIPAddress();
        setSendData(ipData);
      }
      addDataToFirebase(sendData);
    };
    fetchData();
    return () => {
      clearTimeout(timeoutId);
      setSendData({
        ip: "",
      });
    };
  }, []);
  return (
    <>
      <nav>
        <Header />
        <ul>
          <li className="d-flex flex-row mb-3 p-2 justify-content-evenly"></li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        ></Route>
        <Route
          path="/aboutme"
          element={
            <Suspense fallback={<Loader />}>
              <AboutMe />
            </Suspense>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loader />}>
              <Admin />
            </Suspense>
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <Suspense fallback={<Loader />}>
              <Contact />
            </Suspense>
          }
        />{" "}
        <Route
          path="/whatsapp"
          element={
            <Suspense fallback={<Loader />}>
              <WhatsAppSender />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;

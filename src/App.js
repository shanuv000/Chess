import React, { lazy, Suspense } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Loader from "./Components/Loader";
const Home = lazy(() => import("./Pages/Home"));
const Admin = lazy(() => import("./Pages/Admin"));

function App() {
  return (
    <>
      <nav>
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
          path="/admin"
          element={
            <Suspense fallback={<Loader />}>
              <Admin />
            </Suspense>
          }
        ></Route>
        {/* <Route
          path="/currencies"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Currencies />
            </Suspense>
          }
        ></Route>
        <Route
          path="/currencies2"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CurrencyConverterComponent />
            </Suspense>
          }
        ></Route> */}
      </Routes>
    </>
  );
}

export default App;

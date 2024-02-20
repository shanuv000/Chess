import React, { lazy, Suspense } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
// import { chessId, imagess } from "./assets/apis";
import Currencies from "./Pages/Currencies";
import CurrencyConverterComponent from "./Pages/CurrencyConverterComponent";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li className="d-flex flex-row mb-3 p-2 justify-content-evenly">
            {/* <Link to="/">Home</Link>
            <Link to="/admin">admin</Link>
            <Link to="/currencies">currencies</Link>
            <Link to="/currencies2">currencies 2</Link> */}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        {/* <Route
          path="/currencies2"
          element={<CurrencyConverterComponent />}
        ></Route>
        <Route path="/currencies" element={<Currencies />}></Route> */}
      </Routes>
    </>
  );
}

export default App;

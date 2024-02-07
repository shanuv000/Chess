import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import { chessId, imagess } from "./assets/assets";
import Chess from "./Components/Chess";
import AddChess from "./Components/admininstrator/AddChess";
function App() {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/admin">admin</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </>
  );
}

export default App;

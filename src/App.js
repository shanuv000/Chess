import React from "react";
import { FirebaseApp } from "firebase/app";
import { chessId, imagess } from "./assets/assets";
import Chess from "./Components/Chess";
import AddChess from "./Components/AddChess";
function App() {
  return (
    <div className="App">
      <div className="container-lg-fluid text-center">
        <h1 className="mt-1  text-center">Chess games</h1>
        <AddChess /> <Chess />
      </div>
    </div>
  );
}

export default App;

import React from "react";
import Chess from "../Components/Chess";
const Home = () => {
  return (
    <div className="App">
      <div className="container-lg-fluid text-center">
        <h1 className="mt-1  text-center">Chess games</h1>
        <Chess />
      </div>
    </div>
  );
};

export default Home;

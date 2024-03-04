import React from "react";
import Chess from "../Components/Chess";
const Home = () => {
  return (
    <div className="App container-fluid ">
      <div className="container-lg-fluid text-center   ">
        <h1 className="mt-1  text-center ">Vaibhav | Chess Games</h1>
        <Chess />
      </div>
    </div>
  );
};

export default Home;

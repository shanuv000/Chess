import React from "react";
import { BallTriangle, DNA, Bars } from "react-loader-spinner";

const Loader = () => {
  const height = window.innerHeight / 2;
  //   const width = window.innerWidth;
  console.log("Height is -> " + height);
  return (
    <div className="d-flex justify-content-center">
      <Bars
        height={height}
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;

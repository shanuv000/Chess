import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  const height = window.innerHeight / 2;
  //   const width = window.innerWidth;
  console.log("Height is -> " + height);
  return (
    <div className="container d-flex justify-content-center ">
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

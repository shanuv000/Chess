import React, { useEffect } from "react";
import axios from "axios";

const CurrencyConverterComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      console.log("Making request...");
      const options = {
        method: "GET",
        url: "https://currencyconverter.p.rapidapi.com/availablecurrencies",
        headers: {
          "X-RapidAPI-Key":
            "df5446d358msh92435ea35de93f9p11eea2jsn5142275af42e",
          "X-RapidAPI-Host": "currencyconverter.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log("Response received:", response.data);
        // Handle the data as needed
      } catch (error) {
        console.error("Error:", error);
        // Handle errors here
      }
    };

    fetchData();
  }, []);
  return <>Shanu</>;
};

export default CurrencyConverterComponent;

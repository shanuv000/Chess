import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Currencies = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // To handle errors
  console.log(data);
  useEffect(() => {
    axios
      .get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
      )
      .then((response) => setData(response.data));
  }, []);

  return (
    <>
      <select class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        {Object.entries(data).map(([code, currencyName]) => (
          <option value={code}>
            {code} : {currencyName}
          </option>
        ))}
      </select>
    </>
  );
};

export default Currencies;

// const google_maps_api = "AIzaSyBOz3HOnjRkwmwetEXjSyw5PQYrN4sIYZo";
import { useState } from "react";
import axios from "axios";
import { add_data } from "./configFirebase";
const fetchAPIURL = "https://api.ipify.org/";
const google_maps_api = process.env.REACT_APP_GOOGLE_MAP_API;
const fetchLatandLng = `https://www.googleapis.com/geolocation/v1/geolocate?key=${google_maps_api}`;
export const getIPAddress = async () => {
  try {
    const response = await axios.get(fetchAPIURL);

    return { ip: response.data };
  } catch (error) {
    console.error("Error fetching IP address:", error.message);
  }
};
export const addDataToFirebase = async (sendData) => {
  if (sendData.ip !== "") {
    try {
      await add_data({ sendData });
    } catch (error) {
      console.error("Error adding data:", error.message);
    }
  } else {
    console.error("IP address not fetched.");
  }
};

export const addLatandLng = async () => {
  const response = await axios.post(fetchLatandLng);
  return response.data;
};
export const fetchData = async () => {
  // if (sendData.ip === "" && sendData.lat === "" && sendData.lng === "") {
  const ipData = await getIPAddress();
  console.log("ipdata", ipData);
  // setSendData(ipData);
  const getLatandlang = await addLatandLng();
  await addDataToFirebase({
    ip: ipData.ip,
    accuracy: getLatandlang.accuracy,
    lat: getLatandlang.location.lat,
    lng: getLatandlang.location.lng,
  });
  // }
};

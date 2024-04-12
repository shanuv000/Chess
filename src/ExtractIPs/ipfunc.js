import axios from "axios";
import { add_data } from "./configFirebase";
export const getIPAddress = async () => {
  try {
    const response = await axios.get("https://api.ipify.org/");

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

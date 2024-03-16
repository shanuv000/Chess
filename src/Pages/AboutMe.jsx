import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import Statss from "../Components/Statss";

const AboutMe = () => {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState(null);
  const [searchPlayer, setSearchPlayer] = useState("shanuv000");
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.chess.com/pub/player/${searchPlayer}`
      );
      const response2 = await axios.get(
        `https://api.chess.com/pub/player/${searchPlayer}/stats`
      );

      if (response.status === 200) {
        setUserData(response.data);
        setStats(response2.data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = () => {
    fetchUserData();
  };

  useEffect(() => {
    console.log(loading);
    fetchUserData();
  }, [searchPlayer]);

  console.log("set done", loading);
  console.log(stats ? stats.chess_blitz.record.loss : "load");

  if (loading === true || userData === null) {
    return <Loader />;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <form className="d-flex flex-row">
            <input
              className="form-control mb-2 p-2"
              type="text"
              placeholder="Enter username"
              onChange={(e) => setSearchPlayer(e.target.value)}
            />
            <button
              type="button"
              className="p-2 mx-1 btn btn-outline-info"
              onClick={handleChange}
            >
              Search
            </button>
          </form>
        </div>
        <h1 className="text-center">{userData ? userData.name : ""}</h1>
        <div className="col-6">
          {userData && (
            <div>
              <img
                width={"70%"}
                src={userData.avatar}
                className="rounded my-2"
                alt="Description of the "
              />
              <span className="p-2">
                {userData.is_streamer ? "Streamer" : ""}
              </span>
              {/* Add more details as needed */}
            </div>
          )}
        </div>
        <div className="col-6">
          <Statss />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

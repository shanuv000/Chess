import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import Statss from "../Components/Statss";

const AboutMe = () => {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState(null);
  const [searchPlayer, setSearchPlayer] = useState("shanuv000");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.chess.com/pub/player/${searchPlayer}`
      );
      const response2 = await axios.get(
        `https://api.chess.com/pub/player/${searchPlayer}/stats`
      );

      if (response.status === 200 && response2.status === 200) {
        setUserData(response.data);
        setStats(response2.data);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (error) {
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPlayer(inputValue);
  };

  useEffect(() => {
    fetchUserData();
  }, [searchPlayer]);

  if (loading || userData === null) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <form className="d-flex flex-row" onSubmit={handleSubmit}>
            <input
              className="form-control mb-2 p-2"
              type="text"
              placeholder="Enter username"
              value={inputValue}
              onChange={handleChange}
            />
            <button type="submit" className="p-2 mx-1 btn btn-outline-info">
              Search
            </button>
          </form>
        </div>
        <div className="col-12 text-center">
          <h1>{userData ? userData.name : ""}</h1>
          <div>
            <img
              width={"70%"}
              src={userData.avatar}
              className="rounded my-2"
              alt="User Avatar"
            />
            <span className="p-2">
              {userData.is_streamer ? "Streamer" : ""}
            </span>
            {/* Add more details as needed */}
          </div>
        </div>
        <div className="col-12">
          <Statss stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

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
        const {
          avatar,
          player_id,
          name,
          username,
          followers,
          location,
          joined,
          status,
          is_streamer,
          verified,
          league,
        } = response.data;
        setUserData({
          avatar,
          name,
          username,
          followers,
          location,
          joined,
          status,
          is_streamer,
          verified,
          league,
        });

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

  const {
    name,
    avatar,
    username,
    followers,
    location,
    joined,
    status,
    is_streamer,
    verified,
    league,
  } = userData;

  return (
    <div className="container mt-5">
      <div className="row mt-3">
        <div className="col-md-12">
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
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <img
                src={avatar}
                alt="User Avatar"
                className="rounded-circle img-fluid mb-3"
                style={{ width: "150px", height: "150px" }}
              />
              <h4 className="card-title">{name}</h4>
              <p className="card-text">Username: {username}</p>
              <p className="card-text">Followers: {followers}</p>
              <p className="card-text">Location: {location}</p>
              <p className="card-text">Joined: {joined}</p>
              <p className="card-text">Status: {status}</p>
              <p className="card-text">{is_streamer ? "Streamer" : ""}</p>
              <p className="card-text">{verified ? "Verified" : ""}</p>
              <p className="card-text">League: {league}</p>
            </div>
          </div>
        </div>
        {/* <div className="col-md-8">
          <Statss stats={stats} />
        </div> */}
      </div>
    </div>
  );
};

export default AboutMe;

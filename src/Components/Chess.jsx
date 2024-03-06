import React, { useState, useEffect } from "react";
import moment from "moment";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Loader from "./Loader";

const Chess = () => {
  const [chessList, setChessList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const chessCollectionRef = collection(db, "chess");

  const getChessList = async () => {
    try {
      const querySnapshot = await getDocs(chessCollectionRef);
      const chessData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChessList(chessData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortChessListByTimestamp = () => {
    return [...chessList].sort(
      (a, b) => b.timestamp?.toDate() - a.timestamp?.toDate()
    );
  };

  useEffect(() => {
    getChessList();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Chess Game</h2>

      <div className="row row-cols-1 row-cols-lg-3 g-4">
        {sortChessListByTimestamp().map((chess) => (
          <div key={chess.id} className="col mb-4">
            <div className="card h-100">
              <div className="card-body">
                <p className="card-text">
                  <small className="text-muted">
                    {chess.timestamp
                      ? moment(chess.timestamp.toDate()).format("MMM Do YYYY")
                      : moment().format("MMM Do YYYY")}
                  </small>
                </p>
                <iframe
                  title={`chess ${chess.id}`}
                  id={chess.id}
                  frameBorder={0}
                  style={{
                    width: "100%",
                    border: "none",
                    height: "600px", // Adjusted height for better visibility
                  }}
                  src={`//www.chess.com/emboard?id=${chess.gameNum}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chess;

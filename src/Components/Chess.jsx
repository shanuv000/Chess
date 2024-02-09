import React from "react";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Loader from "./Loader";

const Chess = () => {
  const [chessListId, setChessListId] = useState([]);
  const chessCollectionRef = collection(db, "chess");
  const [load, setLoad] = useState(0);
  // Getting Chess Data

  const getChessList = async () => {
    // Read the Data
    // Set the movie list
    try {
      const data = await getDocs(chessCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChessListId(filterData);

      console.log(filterData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getChessList();
    setTimeout(() => {
      setLoad(1);
    }, 2000);
  }, []);

  if (load === 0) {
    return <Loader />;
  }

  return (
    <div className="row">
      {chessListId.map((ids) => {
        return (
          <div className="col-sm-12  col-lg-4  mt-sm-1 mt-lg-4">
            <iframe
              // className="ratio ratio-1x1"
              title={`chess ${ids.id}`}
              id={ids}
              // allowTransparency="true"
              frameBorder={0}
              style={{
                width: "100%",
                border: "none",
                height: "750px",
                // height='100%'
              }}
              src={`//www.chess.com/emboard?id=${ids.gameNum}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Chess;

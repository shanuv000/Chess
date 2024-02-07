import React from "react";
import { useState } from "react";

import { db } from "../../config/firebase";
import GetChessData from "./GetChessData";
import { collection, addDoc } from "firebase/firestore";

const AddChess = () => {
  const [newChessId, setNewChessId] = useState("");
  const chessCollectionRef = collection(db, "chess");

  const onAddChessId = async () => {
    try {
      await addDoc(chessCollectionRef, {
        gameNum: newChessId,
      });

      //   getMovieList();
    } catch (err) {
      console.err(err);
    }
    setNewChessId("");
  };

  return (
    <div className="container text-center mt-4">
      <div className="row">
        <div className="col-12">
          <input
            type="text"
            placeholder="Enter game Id"
            onChange={(e) => setNewChessId(e.target.value)}
          />
          <button onClick={onAddChessId}>Submit</button>
        </div>
        <div className="col-8">
          <GetChessData />
        </div>
      </div>
    </div>
  );
};

export default AddChess;

import React from "react";
import { useState } from "react";

import { db } from "../config/firebase";
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
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter game Id"
        onChange={(e) => setNewChessId(e.target.value)}
      />
      <button onClick={onAddChessId}>Submit</button>
    </div>
  );
};

export default AddChess;

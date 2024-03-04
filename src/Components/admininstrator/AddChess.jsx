import React from "react";
import { useState } from "react";

import { db } from "../../config/firebase";
import GetChessData from "./GetChessData";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";

const AddChess = () => {
  const [newChessId, setNewChessId] = useState("");
  const chessCollectionRef = collection(db, "chess");
  const [isEmpty, setIsEmpty] = useState(false);
  // const quantity = 11497655;
  // console.log(quantity.toString().length);
  const onAddChessId = async (e) => {
    e.preventDefault();
    if (
      newChessId === 0 ||
      isNaN(newChessId) ||
      newChessId.toString().length !== 8
    ) {
      setIsEmpty(true);
      setNewChessId("");
      setTimeout(() => {
        setIsEmpty(false);
      }, 3000);

      return;
    }
    try {
      await addDoc(chessCollectionRef, {
        gameNum: newChessId,
        timestamp: serverTimestamp(),
      });

      //   getMovieList();
    } catch (err) {
      console.err(err);
    }
    await setNewChessId("");
  };

  return (
    <div className="container text-center mt-4">
      <div className="row">
        <div className="col-8">
          <input
            class="form-control"
            type="text"
            placeholder="Enter game Id"
            value={newChessId}
            onChange={(e) => setNewChessId(e.target.value)}
          />
          <button
            type="button"
            class="btn btn-outline-primary m-2"
            onClick={onAddChessId}
          >
            Submit
          </button>
          {isEmpty && (
            <div class="alert alert-danger mt-2  " role="alert">
              Please Insert valid inputs..
            </div>
          )}
        </div>
        <div className="col-12">
          <GetChessData />
        </div>
      </div>
    </div>
  );
};

export default AddChess;

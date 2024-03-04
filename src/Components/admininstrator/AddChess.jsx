import React from "react";
import { useState } from "react";

import { db } from "../../config/firebase";
import GetChessData from "./GetChessData";
import { collection, addDoc } from "firebase/firestore";

const AddChess = () => {
  const [newChessId, setNewChessId] = useState(0);
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
      setNewChessId(0);
      setTimeout(() => {
        setIsEmpty(false);
      }, 3000);

      return;
    }
    try {
      await addDoc(chessCollectionRef, {
        gameNum: newChessId,
      });

      //   getMovieList();
    } catch (err) {
      console.err(err);
    }
    setNewChessId(0);
  };

  return (
    <div className="container text-center mt-4">
      <div className="row">
        <div className="col-auto">
          <input
            class="form-control"
            type="text"
            placeholder="Enter game Id"
            onChange={(e) => setNewChessId(e.target.value)}
          />
          <button
            type="button"
            class="btn btn-outline-primary "
            onClick={onAddChessId}
          >
            Submit
          </button>
          {isEmpty && (
            <div class="alert alert-danger mt-2 col-6 " role="alert">
              Please Insert valid inputs..
            </div>
          )}
        </div>
        <div className="col-auto">
          <GetChessData />
        </div>
      </div>
    </div>
  );
};

export default AddChess;

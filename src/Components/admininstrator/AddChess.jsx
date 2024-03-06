import React, { useState } from "react";
import { db } from "../../config/firebase";
import GetChessData from "./GetChessData";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AddChess = () => {
  const [newChessId, setNewChessId] = useState("");
  const chessCollectionRef = collection(db, "chess");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateChessId = (id) => {
    const isValid = !isNaN(id) && id.toString().length === 8;
    return isValid;
  };

  const onAddChessId = async () => {
    if (!validateChessId(newChessId)) {
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
      setIsSuccess(true);
      setNewChessId("");
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter game ID"
              value={newChessId}
              onChange={(e) => setNewChessId(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={onAddChessId}
            >
              Submit
            </button>
          </div>
          {isEmpty && (
            <div className="alert alert-danger" role="alert">
              Please insert a valid 8-digit game ID.
            </div>
          )}
          {isSuccess && (
            <div className="alert alert-success" role="alert">
              Chess game added successfully!
            </div>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <GetChessData />
        </div>
      </div>
    </div>
  );
};

export default AddChess;

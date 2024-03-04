import React, { useContext } from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import { db } from "../../config/firebase";
import FirebaseContext from "../../context/FirebaseContext";
import {
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
const GetChessData = () => {
  const { getChessList, DeleteChess } = useContext(FirebaseContext);
  const [chessListId, setChessListId] = useState([]);

  const [updateChessId, setUpdateChessId] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getChessList().then((val) => setChessListId(val));
  }, []);

  // Update Chess
  const updateChess = async (id) => {
    try {
      const chessDoc = doc(db, "chess", id);
      await updateDoc(chessDoc, { gameNum: updateChessId });
      getChessList();
    } catch (error) {
      console.error(error);
    }
  };

  var i = 0;
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="Chess ID">Chess Id</th>
          <th scope="Date">Added On</th>
          <th scope="delete">Delete</th>
          <th scope="Edit">Edit</th>
        </tr>
      </thead>
      <tbody>
        {chessListId.map((ids) => {
          i = i + 1;
          return (
            <tr key={ids.id}>
              <th scope="row">{i}</th>
              <td>{ids.gameNum}</td>
              <td>
                {ids.timestamp
                  ? moment(ids.timestamp.toDate()).calendar()
                  : moment().calendar()}
              </td>
              <td>
                <button onClick={() => DeleteChess(ids.id)}>Del</button>
              </td>
              <td>
                {isVisible && (
                  <>
                    <input
                      placeholder="Update title"
                      onChange={(e) => setUpdateChessId(e.target.value)}
                    />

                    <button onClick={() => updateChess(ids.id)}>
                      Upadte {ids.gameNum}
                    </button>
                  </>
                )}
                {!isVisible && (
                  <button onClick={() => setIsVisible(true)}>Edit</button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GetChessData;

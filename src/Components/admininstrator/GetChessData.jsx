import React, { useContext, useState, useEffect } from "react";
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
  const [chessList, setChessList] = useState([]);
  const [editChessId, setEditChessId] = useState("");
  const [updatedGameNum, setUpdatedGameNum] = useState("");
  const fetchChessList = async () => {
    try {
      const chessCollection = collection(db, "chess");
      const querySnapshot = await getDocs(chessCollection);
      const sortedChessList = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.timestamp?.toMillis() - a.timestamp?.toMillis());

      setChessList(sortedChessList);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchChessList();
  }, [getChessList]); // Include getChessList in the dependency array

  const handleEditToggle = (id, gameNum) => {
    setEditChessId(id);
    setUpdatedGameNum(gameNum);
  };

  const handleUpdateChess = async () => {
    try {
      const chessDoc = doc(db, "chess", editChessId);
      await updateDoc(chessDoc, { gameNum: updatedGameNum });
      setEditChessId("");
      setUpdatedGameNum("");
      getChessList();
      fetchChessList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="table">
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
        {chessList.map((chess, index) => (
          <tr key={chess.id}>
            <th scope="row">{index + 1}</th>
            <td>{chess.gameNum}</td>
            <td>
              {chess.timestamp
                ? moment(chess.timestamp.toDate()).calendar()
                : moment().calendar()}
            </td>
            <td>
              <button onClick={() => DeleteChess(chess.id)}>Del</button>
            </td>
            <td>
              {editChessId === chess.id ? (
                <>
                  <input
                    placeholder="Update title"
                    value={updatedGameNum}
                    onChange={(e) => setUpdatedGameNum(e.target.value)}
                  />
                  <button onClick={handleUpdateChess}>Update</button>
                </>
              ) : (
                <button
                  onClick={() => handleEditToggle(chess.id, chess.gameNum)}
                >
                  Edit
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GetChessData;

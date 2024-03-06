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
  const { getChessList } = useContext(FirebaseContext);
  const [chessList, setChessList] = useState([]);
  const [editChessId, setEditChessId] = useState("");
  const [updatedGameNum, setUpdatedGameNum] = useState("");
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

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
  }, []); // Fetch the chess list once when the component mounts

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
      fetchChessList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmationId(id);
  };

  const handleDeleteChess = async (id) => {
    try {
      await deleteDoc(doc(db, "chess", id));
      setChessList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteConfirmationId(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Chess Game List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Chess ID</th>
              <th scope="col">Added On</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chessList.map((chess, index) => (
              <tr key={chess.id}>
                <th scope="row">{index + 1}</th>
                <td>{chess.gameNum}</td>
                <td>
                  {chess.timestamp ? (
                    <>{moment(chess.timestamp.toDate()).calendar()}</>
                  ) : (
                    <>No timestamp available</>
                  )}
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteConfirmation(chess.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEditToggle(chess.id, chess.gameNum)}
                    >
                      Edit
                    </button>
                  </div>

                  {/* Deletion Confirmation Modal */}
                  {deleteConfirmationId === chess.id && (
                    <div
                      className="modal fade show"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="deleteConfirmationModal"
                      style={{ display: "block" }}
                    >
                      {/* Modal Content */}
                    </div>
                  )}
                  {/* End Deletion Confirmation Modal */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetChessData;

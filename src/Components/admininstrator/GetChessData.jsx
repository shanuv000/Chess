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
    <div className="table-responsive">
      <table className="table table-striped table-bordered mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Chess ID</th>
            <th scope="col">Added On</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
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
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteConfirmation(chess.id)}
                >
                  Delete
                </button>

                {/* Deletion Confirmation Modal */}
                {deleteConfirmationId === chess.id && (
                  <div
                    className="modal fade show"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="deleteConfirmationModal"
                    style={{ display: "block" }}
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="deleteConfirmationModalLabel"
                          >
                            Confirm Deletion
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setDeleteConfirmationId(null)}
                          ></button>
                        </div>
                        <div className="modal-body">
                          Are you sure you want to delete this chess game?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => setDeleteConfirmationId(null)}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteChess(chess.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* End Deletion Confirmation Modal */}
              </td>
              <td>
                {editChessId === chess.id ? (
                  <>
                    <input
                      className="form-control"
                      placeholder="Update title"
                      value={updatedGameNum}
                      onChange={(e) => setUpdatedGameNum(e.target.value)}
                    />
                    <button
                      className="btn btn-primary btn-sm ms-1"
                      onClick={handleUpdateChess}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-secondary btn-sm ms-1"
                      onClick={() => setEditChessId("")}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEditToggle(chess.id, chess.gameNum)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetChessData;

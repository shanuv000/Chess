import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
const GetChessData = () => {
  const [chessListId, setChessListId] = useState([]);
  const [updateChessId, setUpdateChessId] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const chessCollectionRef = collection(db, "chess");
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
  }, []);

  // Delete Chess
  const deleteChess = async (id) => {
    try {
      const chessDoc = doc(db, "chess", id);
      await deleteDoc(chessDoc);
      getChessList();
    } catch (error) {
      console.error(error);
    }
  };

  //Update Chess
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
                <button onClick={() => deleteChess(ids.id)}>Del</button>
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
      ;
    </table>
  );
};

export default GetChessData;

import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
const GetChessData = () => {
  const [chessListId, setChessListId] = useState([]);

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
  var i = 0;
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="Chess ID">First</th>
        </tr>
      </thead>
      <tbody>
        {chessListId.map((ids) => {
          i = i + 1;
          return (
            <tr key={ids.id}>
              <th scope="row">{i}</th>
              <td>{ids.gameNum}</td>
            </tr>
          );
        })}
      </tbody>
      ;
      {/* <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
    </table>
  );
};

export default GetChessData;

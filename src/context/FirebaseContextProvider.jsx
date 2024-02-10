import FirebaseContext from "./FirebaseContext";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

const FirebaseContextProvider = ({ children }) => {
  const chessCollectionRef = collection(db, "chess");
  // const [chessListId, setChessListId] = useState("");
  // Get chess List
  const getChessList = async () => {
    // Read the Data
    // Set the movie list

    try {
      const data = await getDocs(chessCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // setChessListId(filterData);

      // console.log(filterData);
      return filterData;
    } catch (err) {
      console.error(err);
    }
  };
  // useEffect(() => {
  //   getChessList();
  //   //  setTimeout(() => {
  //   //    setLoad(1);
  //   //  }, 2000);
  // }, []);
  return (
    <FirebaseContext.Provider value={{ getChessList }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;

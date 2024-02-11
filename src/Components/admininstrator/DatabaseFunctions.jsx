import { db } from "../../config/firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const getChessList = async () => {
  const chessCollectionRef = collection(db, "chess");
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

export const DeleteChess = async (id) => {
  // const deleteChess = async (id) => {
  try {
    const chessDoc = doc(db, "chess", id);
    await deleteDoc(chessDoc);
    // getChessList().then((val) => val);
  } catch (error) {
    console.error(error);
  }
};

// export const UpdateChess = async (id) => {

//   try {
//     const chessDoc = doc(db, "chess", id);
//     await updateDoc(chessDoc, { gameNum: updateChessId });
//     getChessList();
//   } catch (error) {
//     console.error(error);
//   }
// };

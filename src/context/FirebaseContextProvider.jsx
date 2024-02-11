import FirebaseContext from "./FirebaseContext";
import {
  DeleteChess,
  getChessList,
} from "../Components/admininstrator/DatabaseFunctions";

const FirebaseContextProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ getChessList, DeleteChess }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;

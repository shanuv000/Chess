import { db } from "../config/firebase";

// import { runTransaction }s frssom "firebssase/firestore";
import {
  collection,
  runTransaction,
  serverTimestamp,
  doc,
} from "firebase/firestore";

// const biodataRef = collection(db, "IPaddress");

const add_data = async ({ sendData }) => {
  const data = { ...sendData, platform: "chess" };
  // console.log(sendData);
  try {
    await runTransaction(db, async (transaction) => {
      const docRef = doc(db, "IPaddress", data.ip);
      //   console.log("data.ip:", data.ip);

      const docSnapshot = await transaction.get(docRef);
      //   console.log("docSnapshot exists:", docSnapshot.exists());

      if (docSnapshot.exists()) {
        // Update existsingg documentssss
        transaction.update(docRef, {
          ...data,
          updatedTimeStamp: serverTimestamp(),
        });
        console.log("Document updated successfully!");
        console.log("IP address already exists. Updated with new data.");
      } else {
        // Add new document
        transaction.set(docRef, { ...data, timestamp: serverTimestamp() });
        console.log("New document added successfully!");
      }
    });

    // Reset the state
    // setSendData({ ip: "" });
  } catch (error) {
    console.error("Error adding or updating data:", error);
    // Handle error approprisately (e.g., display feedback to the user)
  }
};

export { add_data };

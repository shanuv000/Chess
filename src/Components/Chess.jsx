import React, { useState, useEffect } from "react";
import moment from "moment";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Loader from "./Loader";
import "../App.css";
import Pagination from "react-paginate";

const Chess = () => {
  const [chessList, setChessList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const chessCollectionRef = collection(db, "chess");

  const checkWidthOfWindow = window.innerWidth > 500;
  const viewWidth = checkWidthOfWindow ? 50 : 130;
  useEffect(() => {
    const getChessList = async () => {
      try {
        const querySnapshot = await getDocs(chessCollectionRef);
        const chessData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setChessList(chessData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getChessList();
  }, [chessCollectionRef]);

  const sortChessListByTimestamp = () => {
    return [...chessList].sort(
      (a, b) => b.timestamp?.toDate() - a.timestamp?.toDate()
    );
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  if (isLoading) {
    return <Loader />;
  }

  // Pagination logic
  const paginatedChessList = sortChessListByTimestamp().slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Chess Game</h2>

      <div className="row row-cols-1 row-cols-lg-3 g-4">
        {paginatedChessList.map((chess) => (
          <div key={chess.id} className="col mb-4">
            <div className="card h-100">
              <div
                className="card-body chess-card-body p-0 m-0"
                style={{ color: "white", height: `${viewWidth}vw` }}
              >
                <p className="card-text" style={{ color: "white" }}>
                  <small className="text-muted" style={{ color: "white" }}>
                    {chess.timestamp
                      ? moment(chess.timestamp.toDate()).format("MMM Do YYYY")
                      : moment().format("MMM Do YYYY")}
                  </small>
                </p>

                <iframe
                  title={`chess ${chess.id}`}
                  id={chess.id}
                  frameBorder={0}
                  style={{ width: "100%", height: "100%" }}
                  src={`//www.chess.com/emboard?id=${chess.gameNum}`}
                />
                {/* <div class="ratio ratio-16x9">
                  <iframe
                    id={chess.id}
                    src={`//www.chess.com/emboard?id=${chess.gameNum}`}
                    title={`chess ${chess.id}`}
                    allowfullscreen
                  ></iframe>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(chessList.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Chess;

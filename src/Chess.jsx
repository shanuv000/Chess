import React from "react";

const Chess = ({ chessIds }) => {
  return (
    <div className="row">
      {chessIds.map((ids) => {
        return (
          <div className="col-sm-12  col-lg-4   mt-sm-1 mt-lg-4">
            <iframe
              // className="ratio ratio-1x1"
              title={`chess ${ids}`}
              id={ids}
              // allowTransparency="true"
              frameBorder={0}
              style={{
                width: "100%",
                border: "none",
                height: "750px",
                // height='100%'
              }}
              src={`//www.chess.com/emboard?id=${ids}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Chess;

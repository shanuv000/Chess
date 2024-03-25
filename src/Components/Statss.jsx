import React from "react";

const Stats = ({ stats }) => {
  return (
    <div className="container mt-5">
      <h2>Statistics</h2>
      <div className="row">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{key}</h5>
                <p className="card-text">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;

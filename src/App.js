function App() {
  const chessId = ["11482773", "11482933", "11482949", "11482951", "11482953"];

  const img1 =
    "https://assetsio.reedpopcdn.com/chess-playing-hand.jpeg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp";

  const img2 =
    "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  return (
    <div className="App">
      <div className="container-lg-fluid text-center">
        <h1 className="text-center">Chess games</h1>

        <div className="row">
          {chessId.map((ids) => {
            return (
              <div className="col-sm-12  col-lg-4   mt-4">
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
      </div>
    </div>
  );
}

export default App;

import { chessId, imagess } from "./assets/assets";
import Chess from "./Chess";
function App() {
  return (
    <div className="App">
      <div className="container-lg-fluid text-center">
        <h1 className="mt-1  text-center">Chess games</h1>
        <Chess chessIds={chessId} />
      </div>
    </div>
  );
}

export default App;

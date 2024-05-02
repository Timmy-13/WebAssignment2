import LeaderBoard from "./Components/Leaderboard";
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <>
    <div>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
    </div>
    <div className="container">
      <h1 className="text-center py-4 kanit-semibold">Leader Board</h1>
      <LeaderBoard/>
    </div>
    </>
  );
}

export default App;

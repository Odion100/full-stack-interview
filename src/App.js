import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import BattleArena from "./pages/BattleArena/BattleArena";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="battle-arena/:robot1/:robot2" element={<BattleArena />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { BattleArena } from './components/game/BattleArena';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<BattleArena />} />
        <Route path="/learn" element={<BattleArena />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/leaderboard" element={<div>Leaderboard Coming Soon</div>} />
      </Routes>
    </Router>
  );
}

export default App;
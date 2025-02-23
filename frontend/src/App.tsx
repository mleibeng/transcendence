import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // will replace with states
import Navbar from './components/shared/navigation';
import Home from './pages/shared/home';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import UserStatisticsPage from './pages/user/user_statistics_page';
import ProfilePage from './pages/user/profile_page';
import GameLobby from './pages/game/gameLobby';
import TournamentLobby from './pages/tournament/TournamentLobby';

// Define App as a function component
const App: React.FC = () => {
    return (
      <Router>
        <Navbar />
        <div className="bg-gray-900 min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/statistics" element={<UserStatisticsPage />} />
          <Route path="/tournament" element={<TournamentLobby />} />
          <Route path="/matchmaking" element={<GameLobby />}/>
        </Routes>
        </div>
      </Router>
    );
  };

  export default App;

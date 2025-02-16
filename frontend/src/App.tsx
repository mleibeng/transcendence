import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // will replace with states
import Navbar from './components/shared/navigation';
import Home from './components/shared/home';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';

// Define App as a function component
const App: React.FC = () => {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    );
  };

  export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import WelcomeToDart from './components/WelcomeToDart';
import Signup from './components/signup';
import Login from './components/login';
import UserForm from "./components/UserForm";
import Thank from "./components/Thank";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/welcome" element={<WelcomeToDart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="/thank" element={<Thank />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
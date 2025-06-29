// File: App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginSelector from "./pages/LoginSelector";
import NGOLogin from "./pages/NGOLogin";
import FunderLogin from "./pages/FunderLogin";
import NGODashboard from './Pages/NGODashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSelector />} />
        <Route path="/login/ngo" element={<NGOLogin />} />
        <Route path="/login/funder" element={<FunderLogin />} />
        
        {/* NGO Dashboard Route */}
        <Route path="/ngo/dashboard" element={<NGODashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
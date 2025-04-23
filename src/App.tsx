import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import ExercisePage from './pages/ExercisePage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/home" element={<Home />} />
        <Route path="/dashboard/users" element={<UserManagement />} />
        <Route path="/dashboard/diet" element={<Home />} />
        <Route path="/dashboard/exercise" element={<ExercisePage />} />
        <Route path="/dashboard/mental-health" element={<Home />} />
        <Route path="/dashboard/system" element={<Home />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
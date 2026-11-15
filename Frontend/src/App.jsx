import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import MyProjects from './pages/MyProjects';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './auth/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login is the first page a visitor sees. */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Everything below requires a signed-in user. */}
          <Route
            path="/home"
            element={
              <RequireAuth>
                <main className="app-wrapper">
                  <HeroSection />
                </main>
              </RequireAuth>
            }
          />
          <Route path="/myprojects" element={<RequireAuth><MyProjects /></RequireAuth>} />
          <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

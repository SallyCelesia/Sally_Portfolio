import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import MyProjects from './pages/MyProjects';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main className="app-wrapper">
              <HeroSection />
            </main>
          }
        />
        <Route path="/myprojects" element={<MyProjects />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

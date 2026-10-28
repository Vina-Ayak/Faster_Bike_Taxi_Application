import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ApplyForm from './components/ApplyForm';
import DisplayBikes from './components/DisplayBikes';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Operations from './components/Operations';
import NavBar from './components/NavBar';
import { fontImports } from './components/theme';
import './App.css';

function App() {
  return (
    <Router>
      <style>{fontImports}</style>
      <div className="fbt-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <main className="fbt-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/bikedetails" element={<DisplayBikes />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/operations" element={<Operations />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

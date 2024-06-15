import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regiter" element={<Register />} />
      </Routes>
      <Footer />
    </Router>


  );
}

export default App;

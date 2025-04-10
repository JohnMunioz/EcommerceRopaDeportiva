// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Productos from './components/Productos';
import GestionarProductos from './components/GestionarProductos';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/gestionar" element={<GestionarProductos />} />
      </Routes>
    </Router>
  );
}

export default App;

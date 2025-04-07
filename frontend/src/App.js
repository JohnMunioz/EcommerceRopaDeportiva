// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tienda from './components/Tienda';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Tienda />} />
      </Routes>
    </Router>
  );
}

export default App;

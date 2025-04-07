import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Ecommerce de Ropa Deportiva 👟</h1>
      <nav>
        <Link to="/">Inicio</Link>
        {/* Puedes agregar más enlaces si luego haces páginas como /admin */}
      </nav>
    </header>
  );
};

export default Header;

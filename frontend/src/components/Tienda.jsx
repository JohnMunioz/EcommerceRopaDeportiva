import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tienda.css';

const Tienda = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error('Error al cargar productos:', error));
  }, []);

  return (
    <div className="tienda-container">
      <h2>Tienda de Ropa Deportiva 🏋️‍♀️🧢</h2>
      <div className="productos-grid">
        {productos.map(producto => (
          <div className="producto-card" key={producto.id}>
            <img
              src={`http://localhost:3001${producto.imagen_url}`}
              alt={producto.nombre}
              className="producto-imagen"
            />
            <h3>{producto.nombre}</h3>
            <p className="descripcion">{producto.descripcion}</p>
            <p className="categoria">{producto.categoria}</p>
            <p className="precio">${producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tienda;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al obtener productos:', err));
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
        🔒 <strong>Lista de Productos</strong>
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {productos.map(producto => (
          <div key={producto.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            margin: '10px',
            padding: '10px',
            width: '200px',
            textAlign: 'center'
          }}>
            <img
              src={`http://localhost:3001${producto.imagen_url}`}
              alt={producto.nombre}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p><strong>${producto.precio}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;

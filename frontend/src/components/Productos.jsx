import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleGestionClick = () => {
    navigate('/gestionar');
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosPagina = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numero) => setPaginaActual(numero);

  return (
    <div className="productos-container dark-mode">
      <div className="productos-header">
        <h1>🛒 Productos Disponibles</h1>
        <button className="boton-gestion" onClick={handleGestionClick}>
          Gestionar Productos
        </button>
      </div>

      <input
        className="input-busqueda"
        type="text"
        placeholder="Buscar por nombre o categoría..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1);
        }}
      />

      {productosPagina.length === 0 ? (
        <p>No hay productos disponibles para mostrar.</p>
      ) : (
        <div className="productos-grid">
          {productosPagina.map((producto) => (
            <motion.div
              key={producto.id}
              className="producto-card"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={`http://localhost:3001${producto.imagen_url}`}
                alt={producto.nombre}
              />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p><strong>Precio:</strong> ${Number(producto.precio).toFixed(2)}</p>
              <p className="categoria">{producto.categoria}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="paginacion">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i + 1}
            className={paginaActual === i + 1 ? 'pagina-activa' : ''}
            onClick={() => cambiarPagina(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Productos;

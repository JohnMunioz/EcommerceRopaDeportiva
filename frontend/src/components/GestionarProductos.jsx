import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GestionarProductos.css';

const GestionarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen_url: '',
    categoria_id: '',
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditandoId, setProductoEditandoId] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion) {
        await axios.put(`http://localhost:3001/productos/${productoEditandoId}`, formulario);
      } else {
        await axios.post('http://localhost:3001/productos', formulario);
      }
      fetchProductos();
      resetFormulario();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const resetFormulario = () => {
    setFormulario({
      nombre: '',
      descripcion: '',
      precio: '',
      imagen_url: '',
      categoria_id: '',
    });
    setModoEdicion(false);
    setProductoEditandoId(null);
  };

  const handleEditar = (producto) => {
    setFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen_url: producto.imagen_url,
      categoria_id: categorias.find(cat => cat.nombre === producto.categoria)?.id || '',
    });
    setModoEdicion(true);
    setProductoEditandoId(producto.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/productos/${id}`);
      fetchProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosPagina = productos.slice(indiceInicio, indiceInicio + productosPorPagina);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  return (
    <div className="gestion-container">
      <h1>🛠️ Gestión de Productos</h1>

      <form onSubmit={handleSubmit} className="formulario">
        <input type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={formulario.descripcion} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={formulario.precio} onChange={handleChange} required />
        <input type="text" name="imagen_url" placeholder="URL imagen (ej: /img/camiseta.jpg)" value={formulario.imagen_url} onChange={handleChange} required />
        <select name="categoria_id" value={formulario.categoria_id} onChange={handleChange} required>
          <option value="">-- Selecciona una categoría --</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
        <div className="acciones-formulario">
          <button type="submit" className="btn btn-primary">{modoEdicion ? 'Actualizar' : 'Crear'}</button>
          {modoEdicion && <button type="button" className="btn btn-cancelar" onClick={resetFormulario}>Cancelar</button>}
        </div>
      </form>

      <h2>📦 Productos Registrados</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div className="tabla-contenedor fade-in">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosPagina.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>${parseFloat(producto.precio).toFixed(2)}</td>
                  <td>
                    <img src={`http://localhost:3001${producto.imagen_url}`} alt={producto.nombre} className="imagen-tabla" />
                  </td>
                  <td>{producto.categoria}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleEditar(producto)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleEliminar(producto.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="paginacion">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button key={i} onClick={() => setPaginaActual(i + 1)} className={paginaActual === i + 1 ? 'activo' : ''}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarProductos;

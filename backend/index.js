const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Asegúrate de que este archivo tenga tu conexión a MySQL

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir imágenes estáticas desde la carpeta 'img'
app.use('/img', express.static(path.join(__dirname, 'img')));

// ----------------------------------------
// RUTAS CRUD PARA PRODUCTOS
// ----------------------------------------

// ✅ Obtener todos los productos
app.get('/productos', (req, res) => {
  const sql = `
    SELECT 
      p.id, 
      p.nombre, 
      p.descripcion, 
      p.precio, 
      p.imagen_url,  
      c.nombre AS categoria 
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error al consultar productos:', err.message);
      return res.status(500).json({ error: 'Error al consultar productos' });
    }
    res.json(results);
  });
});

// ✅ Obtener un producto por su ID
app.get('/productos/:id', (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT 
      p.id, 
      p.nombre, 
      p.descripcion, 
      p.precio, 
      p.imagen_url,  
      c.nombre AS categoria 
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    WHERE p.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('❌ Error al consultar producto por ID:', err.message);
      return res.status(500).json({ error: 'Error al consultar producto por ID' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(results[0]);
  });
});

// ✅ Crear un nuevo producto
app.post('/productos', (req, res) => {
  const { nombre, descripcion, precio, imagen_url, categoria_id } = req.body;

  if (!nombre || !descripcion || !precio || !imagen_url || !categoria_id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `
    INSERT INTO productos (nombre, descripcion, precio, imagen_url, categoria_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [nombre, descripcion, precio, imagen_url, categoria_id];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error('❌ Error al insertar producto:', error.message);
      return res.status(500).json({ error: 'Error al insertar producto' });
    }

    res.status(201).json({ mensaje: '✅ Producto creado correctamente', id: result.insertId });
  });
});

// ✅ Actualizar un producto existente
app.put('/productos/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, imagen_url, categoria_id } = req.body;

  if (!nombre || !descripcion || !precio || !imagen_url || !categoria_id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `
    UPDATE productos 
    SET nombre = ?, descripcion = ?, precio = ?, imagen_url = ?, categoria_id = ?
    WHERE id = ?
  `;

  const values = [nombre, descripcion, precio, imagen_url, categoria_id, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error al actualizar producto:', err.message);
      return res.status(500).json({ error: 'Error al actualizar producto' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: '✅ Producto actualizado correctamente' });
  });
});

// ✅ Eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM productos WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar producto:', err.message);
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: '✅ Producto eliminado correctamente' });
  });
});

// ----------------------------------------
// INICIAR SERVIDOR
// ----------------------------------------
app.listen(3001, () => {
  console.log('🚀 Servidor escuchando en el puerto 3001');
});

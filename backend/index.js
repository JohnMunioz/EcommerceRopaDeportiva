const express = require('express');
const cors = require('cors');
const path = require('path'); // <- Necesario para servir archivos estáticos
const db = require('./db'); // <- Conexión a MySQL

const app = express();
app.use(cors());

// ✅ Servir la carpeta de imágenes estáticas
app.use('/img', express.static(path.join(__dirname, 'img')));

// Ruta para obtener productos desde la base de datos
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

app.listen(3001, () => {
  console.log('🚀 Servidor escuchando en el puerto 3001');
});

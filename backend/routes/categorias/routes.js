const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // conexión a tu base de datos

// GET todas las categorías
router.get('/', (req, res) => {
  connection.query('SELECT * FROM categorias', (err, results) => {
    if (err) {
      console.error('Error al obtener categorías:', err);
      return res.status(500).json({ error: 'Error al obtener categorías' });
    }
    res.json(results);
  });
});

module.exports = router;

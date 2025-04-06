const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const productos = [
  {
    id: 1,
    nombre: 'Camiseta Deportiva',
    precio: 50000,
    imagen: 'https://via.placeholder.com/200x200?text=Camiseta'
  },
  {
    id: 2,
    nombre: 'Pantalón Deportivo',
    precio: 75000,
    imagen: 'https://via.placeholder.com/200x200?text=Pantalon'
  },
  {
    id: 3,
    nombre: 'Zapatillas Running',
    precio: 120000,
    imagen: 'https://via.placeholder.com/200x200?text=Zapatillas'
  }
];

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001');
});

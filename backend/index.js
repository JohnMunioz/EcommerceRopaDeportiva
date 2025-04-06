const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Lista de productos de ropa deportiva
const productos = [
  {
    id: 1,
    nombre: "Camiseta Dry Fit",
    precio: 59000,
    imagen: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    nombre: "Pantalón Jogger",
    precio: 99000,
    imagen: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    nombre: "Chaqueta Deportiva",
    precio: 149000,
    imagen: "https://via.placeholder.com/150",
  },
];

// Ruta para obtener productos
app.get("/productos", (req, res) => {
  res.json(productos);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

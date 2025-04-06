// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tienda de Ropa Deportiva</h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {productos.map((producto) => (
          <div key={producto.id} style={{ border: "1px solid #ccc", padding: "1rem", width: 200 }}>
            <img src={producto.imagen} alt={producto.nombre} style={{ width: "100%" }} />
            <h3>{producto.nombre}</h3>
            <p>${producto.precio.toLocaleString()}</p>
            <button>Comprar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

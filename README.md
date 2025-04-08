# 🏋️‍♀️🧢 Ecommerce de Ropa Deportiva

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-black?logo=express)
![Visual Studio Code](https://img.shields.io/badge/VS%20Code-Editor-007ACC?logo=visualstudiocode)
![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?logo=github)
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

![Project Status](https://img.shields.io/badge/status-En%20Desarrollo-yellow)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

> Proyecto desarrollado como parte del reto **#HagaseUnEcommerceChallenge**, una tienda virtual de ropa deportiva moderna, intuitiva y escalable.

---

## 🧩 Tecnologías Usadas

- **Frontend**: React, React Router DOM, Axios  
- **Backend**: Node.js, Express  
- **Herramientas**: Visual Studio Code, Git, GitHub  

---

## 📁 Estructura del Proyecto

```
EcommerceRopaDeportiva/
├── backend/                                # Servidor backend con Node.js y Express
│   ├── img/                                # Carpeta para imágenes de productos (estáticas)
│   ├── node_modules/                       # Dependencias del backend
│   ├── db.js                               # Configuración de conexión a MySQL
│   ├── index.js                            # Archivo principal del servidor
│   ├── package.json                        # Dependencias y scripts del backend
│   └── package-lock.json                   # Archivo de bloqueo de dependencias
│
├── frontend/                               # Aplicación frontend con React
│   ├── node_modules/                       # Dependencias del frontend
│   ├── public/                             # Archivos públicos y estáticos
│   ├── src/                                # Código fuente principal de React
│   │   ├── components/                     # Componentes reutilizables
│   │   │   ├── Tienda.jsx                  # Componente principal de la tienda
│   │   │   └── Tienda.css                  # Estilos CSS para el componente Tienda
│   │   ├── pages/                          # (Espacio reservado para futuras páginas)
│   │   ├── App.js                          # Componente raíz de React
│   │   ├── App.css                         # Estilos globales
│   │   ├── App.test.js                     # Pruebas de React
│   │   ├── index.js                        # Punto de entrada del frontend
│   │   ├── index.css                       # Estilos generales
│   │   ├── logo.svg                        # Logo por defecto
│   │   ├── reportWebVitals.js              # Medición de rendimiento
│   │   └── setupTests.js                   # Configuración de pruebas
│   ├── package.json                        # Dependencias y scripts del frontend
│   └── package-lock.json                   # Archivo de bloqueo de dependencias
│
├── resources/                              # Recursos visuales y documentación técnica
│   ├── bd_ecommerce_deportivo.dbml         # Modelo de base de datos en formato DBML
│   ├── Diagrama_bd_ecommerce_deporti.png   # Diagrama lógico de la base de datos
│   └── Mockup-Ecommerce.png                # Mockup visual de la tienda
│
├── .gitignore                              # Archivos que Git debe ignorar
└── README.md                               # Documentación principal del proyecto
```
---
# Descripción general del proyecto
---

## 🚀 ¿Cómo ejecutar el proyecto?

### ▶️ Frontend
```bash
cd frontend
npm install
npm start
Accede a: http://localhost:3000
```

### 🖥️ Backend
```bash
cd backend
npm install
node index.js
Accede a: http://localhost:3001
```
---

## 📦 Recursos del Proyecto

### 🖌️ Mockup de la Tienda
Representa la interfaz visual propuesta para la tienda en línea.

📂 Ubicación: resources/Mockup-Ecommerce.png
![Mockup de la tienda](resources/Mockup-Ecommerce.png)

### 🧠 Diagrama de Base de Datos
Diseño lógico del modelo de datos del sistema Ecommerce.

📂 Archivos en resources/:
**bd_ecommerce_deportivo.dbml**
**Diagrama_bd_ecommerce_deporti.png**

![Diagrama de la base de datos](resources/Diagrama_bd_ecommerce_deporti.png)

*El diagrama cubre entidades como categorías, productos, variantes, stock e imágenes, estructuradas para garantizar escalabilidad y rendimiento.*



### 📊 Entidades Principales

| 🧱 Entidad    | 📋 Descripción                                                                                                                                     |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `categorias` | Clasifica los productos en tipos como ropa, calzado, accesorios, etc.                                                                             |
| `productos`  | Contiene información general del producto como nombre, descripción y precio base.                                                                 |
| `variantes`  | Define versiones del producto (por ejemplo: color, talla, modelo).                                                                                |
| `stock`      | Relaciona cada variante con su cantidad disponible en inventario.                                                                                 |
| `imagenes`   | Asocia uno o más archivos visuales por producto o variante.                                                                                       |

> 💡 *Este diseño permite una gestión modular y escalable de los productos, así como una experiencia de usuario enriquecida gracias a la variedad de variantes y representaciones visuales.*


### 🛠️ Funcionalidad CRUD del Backend

La API RESTful permite gestionar productos deportivos mediante operaciones básicas de **crear, leer, actualizar y eliminar (CRUD)** desde el backend.

### 📦 Endpoints CRUD

| ⚙️ Método | 🛣️ Ruta               | 🧭 Acción                          | 🧪 Ejemplo de uso     |
|----------|------------------------|-----------------------------------|------------------------|
| `GET`    | `/productos`           | Obtener todos los productos       | `/productos`          |
| `GET`    | `/productos/:id`       | Obtener un producto por ID        | `/productos/16`       |
| `POST`   | `/productos`           | Crear un nuevo producto           | `/productos`          |
| `PUT`    | `/productos/:id`       | Actualizar un producto existente  | `/productos/16`       |
| `DELETE` | `/productos/:id`       | Eliminar un producto por ID       | `/productos/16`       |

---

### 🧪 Ejemplos de Uso

#### 📥 Crear Producto → `POST /productos`
```json
{
  "nombre": "Balón Adidas Football",
  "descripcion": "Balón oficial de alto rendimiento",
  "precio": 300.00,
  "imagen_url": "/img/Balon_Adidas.jpg",
  "categoria": 12
}
```

#### 📤 Obtener Todos los Productos → `GET /productos`
```json
[
  {
    "id": 16,
    "nombre": "Camiseta Adidas Climalite",
    "descripcion": "Camiseta deportiva transpirable para entrenamiento",
    "precio": 89.99,
    "imagen_url": "/img/Camiseta_Run.jpg",
    "categoria": "Ropa deportiva"
  }
]
```

#### 🔍 Obtener Producto por ID → `GET /productos/16`
```json
{
  "id": 16,
  "nombre": "Camiseta Adidas Climalite",
  "descripcion": "Camiseta deportiva transpirable para entrenamiento",
  "precio": 89.99,
  "imagen_url": "/img/Camiseta_Run.jpg",
  "categoria": "Ropa deportiva"
}
```

#### ♻️ Actualizar Producto → `PUT /productos/16`
```json
{
  "nombre": "Camiseta Adidas Techfit",
  "descripcion": "Camiseta de entrenamiento con compresión y tecnología Techfit",
  "precio": 99.99,
  "imagen_url": "/img/Camiseta_Adidas_Techfit.jpg",
  "categoria": 10
}
```

#### 🗑️ Eliminar Producto → `DELETE /productos/16`
```json
{
  "mensaje": "Producto eliminado correctamente"
}
```

---

## 🔗 Repositorio
[GitHub del proyecto](https://github.com/JohnMunioz/EcommerceRopaDeportiva)


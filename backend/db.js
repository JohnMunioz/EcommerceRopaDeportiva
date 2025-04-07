const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'P@ssw0rd2025', 
  database: 'bd_ecommerce_deportivo' 
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
  } else {
    console.log('✅ Conexión a MySQL establecida correctamente');
  }
});

module.exports = connection;

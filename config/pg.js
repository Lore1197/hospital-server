// Create pool

const {Pool} = require('pg')
const pool = new Pool ({
  user: 'postgres',           // Usuario de PostgreSQL
  host: 'localhost',            // Servidor donde está la base de datos
  database: 'postgres', // Nombre de la base de datos
  password: 'lore1234',    // Contraseña del usuario de PostgreSQL
  port: 5432,                   // Puerto de PostgreSQL
})


function serverConnection() {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.stack);
    } else {
      console.log('Conexión exitosa a PostgreSQL');
    }
    release(); // Liberar el cliente
  });  
}



module.exports = {
  pool,
  serverConnection
}
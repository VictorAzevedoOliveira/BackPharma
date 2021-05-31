const  Pool  = require("pg").Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_pharmaoff',
  password: 'root',
  port: 5432
});

pool
  .connect()
  .then(client => {
    console.log('Banco conectado!');
    client.release();
  })
  .catch(err => console.log(err));

exports.query = (text, param) => pool.query(text, param);
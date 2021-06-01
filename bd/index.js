const  Pool  = require("pg").Pool;

const pool = new Pool({
  user: 'uyhhjyeuezfpwa',
  host: 'ec2-23-23-128-222.compute-1.amazonaws.com',
  database: 'd33nsk255gbf7i',
  password: '80317fe736384942e91ab6cd20af4544c6d6eebc8a6d88b81dbeb25303c31ab4',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

pool
  .connect()
  .then(client => {
    console.log('Banco conectado!');
    client.release();
  })
  .catch(err => console.log(err));

exports.query = (text, param) => pool.query(text, param);
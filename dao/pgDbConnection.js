require('dotenv').config();
const { Pool, Client } = require('pg')
// const pool = new Pool({
//   user: 'postgres',
//   host: '34.71.229.195',
//   database: 'mydb',
//   password: 'password',
//   port: 5432,
// })

var pool;
const envName = process.env.ENV_NAME;
console.log("ENV_NAME = " + envName);
if (envName === 'local'){
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
      })
}
else{
    console.log("Start creating pool for non-local env");
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
      })
      console.log("Pool is created");
}


async function getData(){
    console.log("Start getting data");
    const client = await pool.connect();
    const result = await client.query({
    text: 'SELECT issuetype FROM public."IssueType";',
    })

    await client.end();
    console.log(result.rows);

    return result.rows;
}

module.exports = {
    getData
  }

// const client = new Client({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211,
// })

// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })


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
pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
})
console.log("The Pool is created");

async function getData(){
   try{
        console.log("Start pool.query()");
        // const client = await pool.connect();
        // console.log("Start client.query()");
        const result = await pool.query({
            text: 'SELECT issuetype FROM public."IssueType";',
        });
        console.log(result.rows);
        //await client.end();
        return result.rows;
    } catch (ex) {
        console.log("getData() error");
        console.log("" + ex);
        return(ex);
    }
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

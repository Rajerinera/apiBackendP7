const mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Rajerinera11',
  database: 'groupomania',
});
console.log('connecté sql' + pool);

let sql = 'SELECT * FROM user';

pool.query(sql, (err, result, field) =>{
  if (err){
    return console.log(err);
  } 
  return console.log(result);
}) 
module.exports = pool.promise();
 
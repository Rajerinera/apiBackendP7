const mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Rajerinera11',
  database: 'groupomania',
});
console.log('connecté sql' + pool);

let sql = 'SELECT * FROM user';

pool.execute(sql, function (err, result) {
  if (err) throw err;
  console.log(result);
})
module.exports = pool.promise();
 
const mysql = require("mysql2");

mysql.createPool({
  host: process.env.MYSQL_HOST,

});

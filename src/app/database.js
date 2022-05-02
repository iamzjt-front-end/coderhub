const mysql = require("mysql2");
const config = require("../app/config");

mysql.createPool({
  host: config.MYSQL_HOST,

});

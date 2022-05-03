const mysql = require("mysql2");
const config = require("../app/config");

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
});

connections.getConnection((err, conn) => {
  conn.connect(err1 => {
    if (err1) {
      console.log("数据库连接失败: ", err1);
    } else {
      console.log("数据库连接成功~");
    }
  })
})

module.exports = connections.promise();

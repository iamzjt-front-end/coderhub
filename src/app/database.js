const mysql = require("mysql2");

const connections = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connections.getConnection((err, conn) => {
  conn.connect(err => {
    if (err) {
      console.log("数据库连接失败: ", err);
    } else {
      console.log("数据库连接成功~");
    }
  })
})

module.exports = connections.promise();

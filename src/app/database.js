const mysql = require("mysql2");

const connections = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
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

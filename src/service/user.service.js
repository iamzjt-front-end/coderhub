const connection = require("../app/database");

class UserService {
  // 1.用户名和密码 入库
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    return connection.execute(statement, [name, password]);
  }

  // 2.根据用户名查询是否已存在
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    return connection.execute(statement, [name]);
  }
}

module.exports = new UserService();

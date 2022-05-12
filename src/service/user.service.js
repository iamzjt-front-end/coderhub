/**
 * 用户注册
 */
const connection = require("../app/database");

class UserService {
  // 1.用户名和密码 入库
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;

    const result = await connection.execute(statement, [name, password]);
    return result[0];
  }

  // 2.根据用户名查询是否已存在
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;

    const result = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new UserService();

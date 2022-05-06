/**
 * 用户登录
 */
const connection = require("../app/database");

class AuthService {
  // 2.根据用户名查询是否已存在
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;

    const result = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new AuthService();

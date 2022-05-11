/**
 * 权限
 */
const connection = require("../app/database");

class AuthService {
  async checkDynamic(dynamicId) {
    const statement = `SELECT * FROM dynamic WHERE id = ?;`;

    const result = await connection.execute(statement, [dynamicId]);
    return result[0];
  }
}

module.exports = new AuthService();


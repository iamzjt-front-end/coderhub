/**
 * 权限验证
 */
const connection = require("../app/database");

class AuthService {
  async getVerifyData(tableName, dataId) {
    const statement = `SELECT * FROM ${ tableName } WHERE id = ?;`;

    const result = await connection.execute(statement, [dataId]);
    return result[0];
  }
}

module.exports = new AuthService();


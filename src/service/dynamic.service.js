/**
 * 动态
 */
const connection = require("../app/database");

class DynamicService {
  async create(userId, content) {
    const statement = `INSERT INTO dynamic (user_id, content) values (?, ?);`;

    const result = await connection.execute(statement, [userId, content]);
    return result[0];
  }

  async getDynamicById(dynamicId) {
    const statement = `SELECT * FROM dynamic WHERE user_id = ?;`;

    const result = await connection.execute(statement, [dynamicId]);
    return result[0];
  }
}

module.exports = new DynamicService();

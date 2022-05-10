/**
 * 动态
 */
const connection = require("../app/database");

class DynamicService {
  async create(userId, content) {
    const statement = `INSERT INTO dynamic (user_id, content) values (?, ?);`;

    const [result] = await connection.execute(statement, [userId, content]);
    return result;
  }
}

module.exports = new DynamicService();

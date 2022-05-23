/**
 * 标签
 */
const connection = require("../app/database");

class LabelService {
  async create(userId, content) {
    const statement = `INSERT INTO dynamic (user_id, content) values (?, ?);`;

    const result = await connection.execute(statement, [userId, content]);
    return result[0];
  }


}

module.exports = new LabelService();

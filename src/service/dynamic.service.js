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

  async getDynamicByUserId(userId) {
    const statement = `
      SELECT 
        d.id id, d.content content, d.createAt createTime, d.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
        FROM dynamic d 
        LEFT JOIN user u ON d.user_id = u.id 
        WHERE d.user_id = ?;
    `;

    const result = await connection.execute(statement, [userId]);
    return result[0];
  }
}

module.exports = new DynamicService();

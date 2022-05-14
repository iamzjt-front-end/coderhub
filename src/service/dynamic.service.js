/**
 * 用户动态
 */
const connection = require("../app/database");

const sqlFragment = `
  SELECT 
    d.id id, d.content content, d.createAt createTime, d.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM dynamic d 
    LEFT JOIN user u ON d.user_id = u.id
`;

class DynamicService {
  async create(userId, content) {
    const statement = `INSERT INTO dynamic (user_id, content) values (?, ?);`;

    const result = await connection.execute(statement, [userId, content]);
    return result[0];
  }

  async getDynamicList(userId, offset, size) {
    const statement1 = `${ sqlFragment } WHERE d.user_id = ? LIMIT ?, ?;`;
    const statement2 = `${ sqlFragment } LIMIT ?, ?;`;
    let result;
    if (userId) {
      result = await connection.execute(statement1, [userId, offset, size]);
    } else {
      result = await connection.execute(statement2, [offset, size]);
    }
    return result[0];
  }

  async update(dynamicId, content) {
    const statement = `UPDATE dynamic SET content = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [content, dynamicId]);
    return result[0];
  }

  async remove(dynamicId) {
    const statement = `DELETE FROM dynamic WHERE id = ?;`;
    const result = await connection.execute(statement, [dynamicId]);
    return result[0];
  }
}

module.exports = new DynamicService();

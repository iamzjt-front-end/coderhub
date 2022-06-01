/**
 * 用户动态
 */
const connection = require("../app/database");

const sqlFragment = `
  SELECT 
    d.id id, d.content content, d.createAt createTime, d.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) user,
    (SELECT COUNT(*) from comment c WHERE d.id = c.dynamic_id) commentCount
  FROM dynamic d 
  LEFT JOIN user u ON d.user_id = u.id
`;

class DynamicService {
  async create(userId, content) {
    const statement = `INSERT INTO dynamic (user_id, content) VALUES (?, ?);`;

    const result = await connection.execute(statement, [userId, content]);
    return result[0];
  }

  async getDynamicList(userId, offset, limit) {
    const statement1 = `${ sqlFragment } WHERE d.user_id = ? LIMIT ?, ?;`;
    const statement2 = `${ sqlFragment } LIMIT ?, ?;`;
    let result;
    if (userId) {
      result = await connection.execute(statement1, [userId, offset, limit]);
    } else {
      result = await connection.execute(statement2, [offset, limit]);
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

  async getDynamicLabelById(dynamicId, labelId) {
    const statement = `SELECT * FROM dynamic_label WHERE dynamic_id = ? AND label_id = ?;`;
    const result = await connection.execute(statement, [dynamicId, labelId]);
    return result[0] && result[0].length ? result[0][0] : null;
  }

  async addLabel(dynamicId, labelId) {
    const statement = `INSERT INTO dynamic_label (dynamic_id, label_id) VALUES (?, ?);`;
    const result = await connection.execute(statement, [dynamicId, labelId]);
    return result[0];
  }
}

module.exports = new DynamicService();

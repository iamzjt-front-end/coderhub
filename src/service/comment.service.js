/**
 * 评论
 */
const connection = require("../app/database");

class commentService {
  async create(dynamicId, id, content) {
    const statement = `INSERT INTO comment (dynamic_id, user_id, content) values (?, ?, ?);`;

    const result = await connection.execute(statement, [dynamicId, id, content]);
    return result[0];
  }

  async getCommentList(userId, offset, size) {
    
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

module.exports = new commentService();

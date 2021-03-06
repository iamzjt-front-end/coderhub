/**
 * 用户评论
 */
const connection = require("../app/database");

class commentService {
  async create(dynamicId, id, content) {
    const statement = `INSERT INTO comment (dynamic_id, user_id, content) VALUES (?, ?, ?);`;

    const result = await connection.execute(statement, [dynamicId, id, content]);
    return result[0];
  }

  async reply(dynamicId, commentId, id, content) {
    const statement = `INSERT INTO comment (dynamic_id, comment_id, user_id, content) VALUES (?, ?, ?, ?);`;

    const result = await connection.execute(statement, [dynamicId, commentId, id, content]);
    return result[0];
  }

  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;

    const result = await connection.execute(statement, [content, commentId]);
    return result[0];
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const result = await connection.execute(statement, [commentId]);
    return result[0];
  }

  async getListByDynamicId(dynamicId) {
    const statement = `
      SELECT 
        c.id id, c.content content, c.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name) commentator
      from comment c 
      LEFT JOIN user u ON c.user_id = u.id
      WHERE dynamic_id = ?;
    `;

    const result = await connection.execute(statement, [dynamicId]);
    return result[0];
  }
}

module.exports = new commentService();

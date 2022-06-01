/**
 * 标签
 */
const connection = require("../app/database");

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;

    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;

    const result = await connection.execute(statement, [name]);
    return result[0] && result[0].length ? result[0][0] : false;
  }
}

module.exports = new LabelService();

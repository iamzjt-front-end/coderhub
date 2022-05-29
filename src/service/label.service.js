/**
 * 标签
 */
const connection = require("../app/database");

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) values (?);`;

    const result = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelService();

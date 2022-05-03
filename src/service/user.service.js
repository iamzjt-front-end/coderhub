const connection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO \`user\` (name, password) VALUES (?, ?);`;

    // 将user存储到数据库中
    return connection.execute(statement, [name, password]);
  }
}

module.exports = new UserService();

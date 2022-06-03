/**
 * 文件上传
 */
const connection = require("../app/database");

class FileService {
  async upload(id, originalname, filename, mimetype, path, size) {
    const statement = `INSERT INTO file (user_id, originalname, filename, mimetype, path, size) VALUES (?, ?, ?, ?, ?, ?);`;

    const result = await connection.execute(statement, [id, originalname, filename, mimetype, path, size]);
    return result[0];
  }
}

module.exports = new FileService();

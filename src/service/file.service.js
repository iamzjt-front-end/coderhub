/**
 * 文件上传
 */
const connection = require("../app/database");

class FileService {
  async upload(id, dynamicId, originalname, filename, mimetype, path, size) {
    const statement = `INSERT INTO file (user_id, dynamic_id, originalname, filename, mimetype, path, size) VALUES (?, ?, ?, ?, ?, ?, ?);`;

    const result = await connection.execute(statement, [id, dynamicId, originalname, filename, mimetype, path, size]);
    return result[0];
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM file WHERE user_id = ? AND dynamic_id IS NULL;`;

    const result = await connection.execute(statement, [userId]);
    return result[0][0];
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ? WHERE dynamic_id IS NOT NULL;`;

    const result = await connection.execute(statement, [filename]);
    return result[0][0];
  }
}

module.exports = new FileService();

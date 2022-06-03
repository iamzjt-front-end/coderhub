/**
 * 文件上传
 */
const fileService = require("../service/file.service");

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1. 获取上传头像的用户id及图像相关的信息
    const { id } = ctx.user;
    const { originalname, filename, mimetype, path, size } = ctx.req.file;

    ctx.body = await fileService.upload(id, originalname, filename, mimetype, path, size);
  }
}


module.exports = new FileController();

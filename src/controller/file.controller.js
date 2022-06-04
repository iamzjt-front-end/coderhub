/**
 * 文件上传
 */
const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const config = require("../app/config");

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取上传头像的用户id及图像相关的信息
    const { id } = ctx.user;
    const { originalname, filename, mimetype, path, size } = ctx.req.file;

    const result = await fileService.upload(id, originalname, filename, mimetype, path, size);

    // 2.将图片地址保存在 user 表中
    const avatarUrl = `http://${ config.APP_HOST }:${ config.APP_PORT }/user/${ id }/avatar`;
    await userService.updateAvatarUrlById(id, avatarUrl);

    // 3.返回结果
    ctx.body = "上传头像成功~";
  }
}


module.exports = new FileController();

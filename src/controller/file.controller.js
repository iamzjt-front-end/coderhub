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

    await fileService.upload(id, null, originalname, filename, mimetype, path, size);

    // 2.将图片地址保存在 user 表中
    const avatarUrl = `http://${ config.APP_HOST }:${ config.APP_PORT }/user/${ id }/avatar`;
    await userService.updateAvatarUrlById(id, avatarUrl);

    // 3.返回结果
    ctx.body = "上传头像成功~";
  }

  async savePictureInfo(ctx, next) {
    // 1.获取图像信息
    const { files } = ctx.req;
    const { id } = ctx.user;
    const { dynamicId } = ctx.query;

    // 2.将所有的图片信息保存到数据库中
    for (let file of files) {
      const { originalname, filename, mimetype, path, size } = file;
      await fileService.upload(id, dynamicId, originalname, filename, mimetype, path, size);
    }

    ctx.body = "动态配图上传完成~"
  }
}


module.exports = new FileController();

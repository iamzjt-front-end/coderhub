/**
 * 用户注册
 */
const fs = require("fs");

const userService = require("../service/user.service");
const fileService = require("../service/file.service");
const { AVATAR_PATH } = require("../constants/file-patht");

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 返回数据
    ctx.body = await userService.create(user);
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;

    // 获取头像信息并返回
    const avatarInfo = await fileService.getAvatarByUserId(userId);

    ctx.response.set("content-type", avatarInfo.mimeType);
    ctx.body = fs.createReadStream(`${ AVATAR_PATH }/${ avatarInfo.filename }`);
  }
}

module.exports = new UserController();

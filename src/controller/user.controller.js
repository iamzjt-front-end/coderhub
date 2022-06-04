/**
 * 用户注册
 */
const userService = require("../service/user.service");
const fileService = require("../service/file.service");

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 返回数据
    ctx.body = await userService.create(user);
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;

    const result = await fileService.getAvatarByUserId(userId);
    ctx.body = result[0];
  }
}

module.exports = new UserController();

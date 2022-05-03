const service = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 返回数据
    ctx.body = await service.create(user);
  }
}

module.exports = new UserController();

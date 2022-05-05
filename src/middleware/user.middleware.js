const errorTypes = require("../constants/error-types");
const service = require("../service/user.service");

const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名和密码不能为空
  if (!name || !password || name === '' || password === '') {
    const errorMsg = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", errorMsg, ctx);
  }

  // 3.判断此次注册的用户名是否已存在
  const result = await service.getUserByName(name);
  if (result.length) {
    const errorMsg = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", errorMsg, ctx);
  }

  await next();
}

module.exports = {
  verifyUser
}

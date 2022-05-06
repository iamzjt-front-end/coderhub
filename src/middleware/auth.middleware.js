/**
 * 用户登录
 */
const errorTypes = require("../constants/error-types");
const service = require("../service/user.service");
const md5Encrypt = require("../utils/password-handle");

const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名和密码是否为空
  if (!name || !password) {
    const errorMsg = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", errorMsg, ctx);
  }

  // 3.判断用户是否存在
  const result = await service.getUserByName(name);
  const user = result[0];
  if (!user) {
    const errorMsg = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", errorMsg, ctx);
  }

  // 4.判断密码是否正确 (加密后再和库中的进行比对)
  if (md5Encrypt(password) !== user.password) {
    const errorMsg = new Error(errorTypes.PASSWORD_IS_ERROR);
    return ctx.app.emit("error", errorMsg, ctx);
  }

  await next();
}

module.exports = {
  verifyLogin
}

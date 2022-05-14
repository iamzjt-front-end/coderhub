/**
 * 用户登录
 */
const errorTypes = require("../constants/error-types");
const userService = require("../service/user.service");
const authService = require("../service/auth.service");
const md5Encrypt = require("../utils/password-handle");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名和密码是否为空
  if (!name || !password) {
    const errorMsg = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", errorMsg, ctx);
  }

  // 3.判断用户是否存在
  const result = await userService.getUserByName(name);
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

  ctx.user = user;
  await next();
}

const verifyAuth = async (ctx, next) => {
  // 1. 获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const errorMsg = new Error(errorTypes.Not_LOGGED_IN)
    return ctx.app.emit("error", errorMsg, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 2. 验证token
  try {
    ctx.user = jwt.verify(token, PUBLIC_KEY, {
      algorithm: "RS256"
    });
  } catch (error) {
    const errorMsg = new Error(errorTypes.NOT_AUTHORIZATION);
    return ctx.app.emit("error", errorMsg, ctx);
  }

  await next();
}

const verifyPermission = async (ctx, next) => {
  // 1.获取数据 (当前登录用户userId, 当前修改数据的id)
  const loginUserId = ctx.user.id;
  let operateParams = ctx.request.url.split("/").filter(item => item);
  const [tableName, dataId] = operateParams;

  // 查询此条修改数据的userId
  const result = await authService.getVerifyData(tableName, dataId);
  const operateDataUserId = result[0].user_id;

  // 判断是否具有权限 (登录用户userId 不等于 当前修改数据的userId, 则没有操作权限)
  if (loginUserId !== operateDataUserId) {
    const errorMsg = new Error(errorTypes.NOT_PERMISSION);
    return ctx.app.emit("error", errorMsg, ctx);
  }

  await next();
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}

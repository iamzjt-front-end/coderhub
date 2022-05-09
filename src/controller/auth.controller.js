/**
 * 用户登录
 */
const jwt = require("jsonwebtoken");

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name },);
    ctx.body = `登录成功，欢迎${ name }回来~`;
  }
}

module.exports = new AuthController();

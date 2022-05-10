/**
 * 用户登录
 */
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    });
    // ctx.body = `登录成功，欢迎${ name }回来~`;
    ctx.body = { id, name, token };
  }

  async success(ctx, next) {
    ctx.body = "token验证通过~";
  }
}

module.exports = new AuthController();

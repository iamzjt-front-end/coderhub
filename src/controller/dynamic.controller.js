/**
 * 动态
 */


class DynamicController {
  async create(ctx, next) {
    ctx.body = "发表动态成功~";
  }
}

module.exports = new DynamicController();

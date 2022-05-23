/**
 * 标签
 */
const labelService = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    // 1. 获取数据(user_id, content)
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 2. 将数据插入到数据库
    ctx.body = await labelService.create(userId, content);
  }
}

module.exports = new LabelController();

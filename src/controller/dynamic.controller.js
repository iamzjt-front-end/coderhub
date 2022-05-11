/**
 * 动态
 */
const service = require("../service/dynamic.service");

class DynamicController {
  async create(ctx, next) {
    // 1. 获取数据(user_id, content)
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 2. 将数据插入到数据库
    ctx.body = await service.create(userId, content);
  }

  async list(ctx, next) {
    // 获取数据 (userId, offset, size)
    const { userId, offset, size } = ctx.query;

    // 有userId, 就查这个用户的动态列表
    // 没有userId, 就查询所有数据
    if (userId) {
      ctx.body = await service.getDynamicList(userId, offset, size);
    } else {
      ctx.body = await service.getDynamicList(null, offset, size);
    }
  }

  async update(ctx, next) {
    const { dynamicId } = ctx.params;
    const { content } = ctx.request.body;
    const { id } = ctx.user;

    ctx.body = "修改成功~";
  }
}

module.exports = new DynamicController();

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

  async detail(ctx, next) {
    // 获取动态id
    const dynamicId = ctx.params.dynamicId;

    // 根据id去查询这条数据
    ctx.body = await service.getDynamicById(dynamicId);
  }
}

module.exports = new DynamicController();

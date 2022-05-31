/**
 * 用户动态
 */
const dynamicService = require("../service/dynamic.service");

class DynamicController {
  async create(ctx, next) {
    // 1. 获取数据(user_id, content)
    const userId = ctx.user.id;
    const { content } = ctx.request.body;

    // 2. 将数据插入到数据库
    ctx.body = await dynamicService.create(userId, content);
  }

  async list(ctx, next) {
    // 获取数据 (userId, offset, size)
    const { userId, offset, size } = ctx.query;

    // 有userId, 就查这个用户的动态列表
    // 没有userId, 就查询所有数据
    if (userId) {
      ctx.body = await dynamicService.getDynamicList(userId, offset, size);
    } else {
      ctx.body = await dynamicService.getDynamicList(null, offset, size);
    }
  }

  async update(ctx, next) {
    const { dynamicId } = ctx.params;
    const { content } = ctx.request.body;

    ctx.body = await dynamicService.update(dynamicId, content);
  }

  async remove(ctx, next) {
    // 1. 获取dynamicId
    const { dynamicId } = ctx.params;

    // 2. 删除内容
    ctx.body = await dynamicService.remove(dynamicId);
  }

  async addLabels(ctx, next) {
    // 1. 获取dynamicId 和 labels
    const { dynamicId } = ctx.params;
    const { labels } = ctx

    // 2. 判断每个标签是否被添加过 todo

    // 2. 写进关系表
    ctx.body = await dynamicService.addLabels(dynamicId, labels);
  }
}

module.exports = new DynamicController();

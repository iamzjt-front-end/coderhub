/**
 * 标签
 */
const labelService = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;

    ctx.body = await labelService.create(name);
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;

    ctx.body = await labelService.getLabels(offset, size);
  }
}

module.exports = new LabelController();

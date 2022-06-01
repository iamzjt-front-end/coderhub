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
    const { offset, limit } = ctx.query;

    ctx.body = await labelService.getLabels(offset, limit);
  }

  async remove(ctx, next) {
    const { labelId } = ctx.params;

    ctx.body = await labelService.remove(labelId);
  }
}

module.exports = new LabelController();

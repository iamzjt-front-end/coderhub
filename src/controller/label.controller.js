/**
 * 标签
 */
const labelService = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    
    ctx.body = await labelService.create(name);
  }
}

module.exports = new LabelController();

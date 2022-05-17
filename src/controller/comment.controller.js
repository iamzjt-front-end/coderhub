/**
 * 用户评论
 */
const commentService = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { dynamicId, content } = ctx.request.body;
    const { id } = ctx.user;

    ctx.body = await commentService.create(dynamicId, id, content)
  }

  async reply(ctx, next) {
    const { commentId } = ctx.params;
    const { dynamicId, content } = ctx.request.body;
    const { id } = ctx.user;

    ctx.body = await commentService.reply(dynamicId, commentId, id, content);
  }

  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;

    ctx.body = await commentService.update(commentId, content);
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;

    ctx.body = await commentService.remove(commentId);
  }

  async list(ctx, next) {
    const { dynamicId } = ctx.query;

    ctx.body = await commentService.getListByDynamicId(dynamicId);
  }
}


module.exports = new CommentController();

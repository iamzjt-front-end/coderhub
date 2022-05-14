/**
 * 评论
 */
const commentService = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { dynamicId, content } = ctx.request.body;
    const { id } = ctx.user;

    ctx.body = await commentService.create(dynamicId, id, content)
  }
}

module.exports = new CommentController();

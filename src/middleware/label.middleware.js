/**
 * 标签
 */
const errorTypes = require("../constants/error-types");

const verifyLabelExists = async (ctx, next) => {
  // 1. 获取标签
  const { labels } = ctx.request.body;

  await next();
}

module.exports = {
  verifyLabelExists
}

/**
 * 标签
 */
const labelService = require("../service/label.service");

const verifyLabelExists = async (ctx, next) => {
  // 1. 获取需要添加的所有的标签
  const { labels } = ctx.request.body;

  // 2. 判断每一个标签在 label 表中是否存在
  const newLabels = [];
  for (let name of labels) {
    const labelResult = await labelService.getLabelByName(name);
    const label = { name };
    if (labelResult.length) {
      label.id = labelResult[0].id;
    } else {
      // 如果不存在就创建
      const result = await labelService.create(name);
      label.id = result.insertId;
    }
    newLabels.push(label);
  }

  ctx.labels = newLabels;

  await next();
}

module.exports = {
  verifyLabelExists
}

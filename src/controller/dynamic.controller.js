/**
 * 用户动态
 */
const fs = require("fs");

const dynamicService = require("../service/dynamic.service");
const fileService = require("../service/file.service");
const { PICTURE_PATH } = require("../constants/file-path");
const config = require("../app/config");

class DynamicController {
  async create(ctx, next) {
    // 1. 获取数据(user_id, content)
    const userId = ctx.user.id;
    const { content } = ctx.request.body;

    // 2. 将数据插入到数据库
    ctx.body = await dynamicService.create(userId, content);
  }

  async list(ctx, next) {
    // 获取数据 (userId, offset, limit)
    const { userId, offset, limit } = ctx.query;

    // 有userId, 就查这个用户的动态列表
    // 没有userId, 就查询所有数据
    let result;
    if (userId) {
      result = await dynamicService.getDynamicList(userId, offset, limit);
    } else {
      result = await dynamicService.getDynamicList(null, offset, limit);
    }
    for (const obj of result) {
      if (obj.images?.length) {
        obj.images = obj.images.map(item => `http://${ config.APP_HOST }:${ config.APP_PORT }/dynamic/images/${ item }`)
      }
    }

    ctx.body = result;
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

    // 2. 添加所有的标签
    for (let label of labels) {
      // 2.1 判断标签是否已经和动态有关系
      const dynamicLabelResult = await dynamicService.getDynamicLabelById(dynamicId, label.id);
      if (!dynamicLabelResult) {
        // 2.2 写进关系表
        await dynamicService.addLabel(dynamicId, label.id);
      }
    }

    ctx.body = "添加标签成功~";
  }

  async fileInfo(ctx, next) {
    const { filename } = ctx.params;

    const fileInfo = await fileService.getFileByFilename(filename);

    ctx.response.set("content-type", fileInfo.mimeType);
    ctx.body = fs.createReadStream(`${ PICTURE_PATH }/${ fileInfo.filename }`);
  }
}

module.exports = new DynamicController();

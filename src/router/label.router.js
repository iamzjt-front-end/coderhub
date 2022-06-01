/**
 * 标签
 */
const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create, list } = require("../controller/label.controller");

const labelRouter = new Router({ prefix: "/label" });

labelRouter.post("/", verifyAuth, create); // 创建标签
labelRouter.get("/", list); // 获取所有的标签

module.exports = labelRouter;

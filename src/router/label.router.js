/**
 * 标签
 */
const Router = require("koa-router");
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");
const { create } = require("../controller/label.controller");

const labelRouter = new Router({ prefix: "/label" });

labelRouter.post("/", verifyAuth, create); // 创建标签

module.exports = labelRouter;

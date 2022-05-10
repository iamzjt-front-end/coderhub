/**
 * 动态
 */
const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create, detail } = require("../controller/dynamic.controller");

const dynamicRouter = new Router({ prefix: "/dynamic" });

dynamicRouter.post("/", verifyAuth, create);
dynamicRouter.get("/:userId", detail); // 查询某个用户发布的动态列表

module.exports = dynamicRouter;

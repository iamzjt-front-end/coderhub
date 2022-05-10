/**
 * 动态
 */
const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create, list } = require("../controller/dynamic.controller");

const dynamicRouter = new Router({ prefix: "/dynamic" });

dynamicRouter.post("/", verifyAuth, create);
dynamicRouter.get("/", list); // 查询动态列表（分页查询） 传userId时查单个用户, 不传查所有

module.exports = dynamicRouter;

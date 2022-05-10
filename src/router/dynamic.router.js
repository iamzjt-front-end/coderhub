/**
 * 动态
 */
const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create } = require("../controller/dynamic.controller");

const dynamicRouter = new Router({ prefix: "/dynamic" });

dynamicRouter.post("/", verifyAuth, create);

module.exports = dynamicRouter;

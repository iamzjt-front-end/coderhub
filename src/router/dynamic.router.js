/**
 * 用户动态
 */
const Router = require("koa-router");
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");
const { create, list, update, remove, addLabels } = require("../controller/dynamic.controller");

const dynamicRouter = new Router({ prefix: "/dynamic" });

dynamicRouter.post("/", verifyAuth, create);
dynamicRouter.get("/", list); // 查询动态列表（分页查询） 传userId时查单个用户, 不传查所有
dynamicRouter.patch("/:dynamicId", verifyAuth, verifyPermission, update); // 修改 (1.用户必须登录 2.当前登录用户具备操作权限)
dynamicRouter.delete("/:dynamicId", verifyAuth, verifyPermission, remove); // 删除 (同上)

dynamicRouter.post("/:dynamicId/labels", verifyAuth, verifyPermission, verifyLabelExists, addLabels); // 给动态添加标签 (可以添加多个)

module.exports = dynamicRouter;

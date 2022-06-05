/**
 * 用户注册
 */
const Router = require("koa-router");
const { create, avatarInfo } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

const userRouter = new Router({ prefix: "/user" });

userRouter.post("/", verifyUser, handlePassword, create); // 创建用户
userRouter.get("/:userId/avatar", avatarInfo); // 获取用户头像

module.exports = userRouter;

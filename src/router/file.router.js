/**
 * 文件上传
 */
const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { avatarHandler, pictureHandler } = require("../middleware/file.middleware");
const { saveAvatarInfo, savePictureInfo } = require("../controller/file.controller");

const fileRouter = new Router({ prefix: "/upload" });

fileRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfo); // 上传头像
fileRouter.post("/picture", verifyAuth, pictureHandler, savePictureInfo); // 动态图像上传

module.exports = fileRouter;

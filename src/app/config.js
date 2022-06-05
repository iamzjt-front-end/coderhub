const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.prod"
})

// 使用绝对路径
// 项目启动目录为 ./src/main.js
// 项目中的相对路径都是基于process.cwd来的, 也就是项目启动目录, 那就得从src往下写
// __dirname是当前文件所有目录

// const PRIVATE_KEY = fs.readFileSync("src/app/keys/private.key");
// const PUBLIC_KEY = fs.readFileSync("src/app/keys/public.key");

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));

module.exports = {
  ...process.env,
  PRIVATE_KEY,
  PUBLIC_KEY
};

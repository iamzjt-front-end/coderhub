const app = require("./app");
require("./app/config");
require("./app/database");

app.listen(process.env.APP_PORT, () => {
  console.log(`服务器在${ process.env.APP_PORT }端口启动成功~`);
});

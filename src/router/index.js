const fs = require("fs");

const useRoutes = (app) => {
  const dir = fs.readdirSync(__dirname);
  dir.forEach(file => {
    if (file === "index.js") return;
    const router = require(`./${ file }`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  })
}

module.exports = useRoutes;

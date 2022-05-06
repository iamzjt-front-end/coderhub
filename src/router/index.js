const fs = require("fs");

const useRoutes = function () {
  const dir = fs.readdirSync(__dirname);
  dir.forEach(file => {
    if (file === "index.js") return;
    const router = require(`./${ file }`);
    this.use(router.routes());
    this.use(router.allowedMethods());
  })
}

module.exports = useRoutes;

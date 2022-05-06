const crypto = require("crypto");

// md5算法加密
const md5Encrypt = (pwd) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(pwd).digest("hex");
  return result;
}

module.exports = {
  md5Encrypt
};

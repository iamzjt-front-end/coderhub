const dotenv = require("dotenv");

dotenv.config({
  path: ".env.dev"
})

module.exports = { ...process.env }

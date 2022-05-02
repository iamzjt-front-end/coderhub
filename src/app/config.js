const dotenv = require("dotenv");

dotenv.config({
  path: ".env.dev"
})

console.log(process.env);

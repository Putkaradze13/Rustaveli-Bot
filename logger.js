const pino = require("pino");
require("dotenv").config();

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      levelFirst: true,
      colorize: true,
      translateTime: "SYS:dd-mm-yyyy HH-MM-ss",
      ignore: "pid,hostname",
    },
  },
});

module.exports = logger;

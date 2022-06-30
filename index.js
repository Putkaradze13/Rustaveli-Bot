const TelegramApi = require("node-telegram-bot-api");
require("dotenv").config();
const logger = require("./logger");

const { TOKEN, HOST, PORT, URL } = process.env;

const bot = new TelegramApi(TOKEN, {
  webHook: {
    host: HOST,
    port: PORT,
  },
});
bot.setWebHook(URL + TOKEN);

bot.setMyCommands([
  { command: "/start", description: "Let's get started" },
  { command: "/about", description: "My bio" },
  { command: "/link", description: "Search me here" },
  { command: "/help", description: "Commands menu" },
]);

const allCommands = {
  commands: {
    start: "/start",
    about: "/about",
    link: "/link",
    help: "/help",
  },
};

const botCommands = Object.values(allCommands.commands).join("\n");

const aboutText =
  "I am Shota Rustaveli, I was born in 1160 AD, I died after 1220 AD. They say I am the great Georgian poet. I am author of Vepkhvistqaosani, also known as The Knight in the Panther’s Skin, or The Lord of the Panther-Skin, the Georgian national epic.";

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      bot.sendMessage(
        chatId,
        `Hello ${msg.from.first_name}, \nI answer commands: \n${botCommands}`
      );
      logger.info(`User ${msg.from.first_name} used command ${text}`);
    } else if (text === "/about") {
      bot.sendMessage(chatId, aboutText);
      logger.info(`User ${msg.from.first_name} used command ${text}`);
    } else if (text === "/link") {
      bot.sendMessage(
        chatId,
        "fb: https://www.facebook.com/Tengo.Putkaradze.13 \ngit: https://git.foxminded.com.ua/foxstudent100722"
      );
      logger.info(`User ${msg.from.first_name} used command ${text}`);
    } else if (text === "/help") {
      bot.sendMessage(
        chatId,
        `${msg.from.first_name}, I answer commands: \n${botCommands}`
      );
      logger.info(`User ${msg.from.first_name} used command ${text}`);
    } else {
      bot.sendMessage(
        chatId,
        `Sorry, my answers are limited, I still need to learn much. \nYou can use commands:\n${botCommands}`
      );
      logger.error(
        `User ${msg.from.first_name} used incorect command "${text}\n${
          new Error().stack
        }"`
      );
    }
  });
};

start();

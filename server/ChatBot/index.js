require('dotenv').config();
const token = process.env.BOT_ID;

const TelegramBot = require('node-telegram-bot-api');

//https://stackoverflow.com/questions/47965955/sending-direct-messages-from-nodejs-script-to-telegram/54003303

const ChatBot = () => {

    const start = () => {

        const bot = new TelegramBot(token, { polling: true });

        console.log("bot listening")

        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            const messageText = msg.text;

            console.log(messageText);

            if (messageText === '/start') {
                bot.sendMessage(chatId, 'Welcome to the bot!');
            }
        });

    }

    return {
        start
    }

}

module.exports = ChatBot;


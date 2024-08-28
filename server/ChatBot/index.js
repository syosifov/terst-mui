require('dotenv').config();
const token = process.env.BOT_ID;


const TelegramBot = require('node-telegram-bot-api');

//https://stackoverflow.com/questions/47965955/sending-direct-messages-from-nodejs-script-to-telegram/54003303

const bot = new TelegramBot(token, { polling: true });

const start = () => {

    console.log("bot listening")

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const messageText = msg.text;

        console.log(chatId);
        console.log(messageText);

        if (messageText === '/start') {
            bot.sendMessage(chatId, 'Welcome to the bot!');
        }
    });

}

// https://core.telegram.org/bots/api#formatting-options
const mssg = (chatId, txt, type=null) => {

    if(type == 'html'){

        bot.sendMessage(chatId, txt, { parse_mode: 'HTML' });

    }else if(type == "photo"){

        bot.sendPhoto(chatId, txt);

    }else{

        bot.sendMessage(chatId, txt);

    }
    


}


module.exports = { start, mssg };


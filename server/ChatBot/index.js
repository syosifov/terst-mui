require('dotenv').config();
const QRCode = require('qrcode');
const token = process.env.BOT_ID;
const { createCanvas } = require("canvas");

const TelegramBot = require('node-telegram-bot-api');

//https://stackoverflow.com/questions/47965955/sending-direct-messages-from-nodejs-script-to-telegram/54003303

const bot = new TelegramBot(token, { polling: true });

const sendQrCode = async (chatId, link) => {

    const canvas = createCanvas(600, 600);

    await QRCode.toCanvas(canvas, link, { width: 600 })
    const buffer = canvas.toBuffer();
    // send picture
    bot.sendPhoto(chatId, buffer);
}

const start = () => {

    console.log("bot listening")

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const messageText = msg.text;

        console.log(chatId);
        console.log(messageText);

        if (messageText === '/start') {
            bot.sendMessage(chatId, 'Welcome to the bot!');
        }

        if (messageText.startsWith("qr-")) {

            // const link = messageText.substring(3, messageText.length);
            // const qrCodeImage = await QRCode.toFile("./ChatBot/img.png", link, {width: 600});
            // //todo generate unique filename for each image and delete the file after sending it
            // //because the wrong file could be sent to the wrong client
            // bot.sendPhoto(chatId, "./ChatBot/img.png");
            // const html = "<a href=\"https://dnschecker.org/qr-code-scanner.php\">test your qr code</a>"
            // bot.sendMessage(chatId, html, { parse_mode: 'HTML' });


            const link = messageText.substring(3, messageText.length);
            sendQrCode(chatId, link);


        }
    });

}

// https://core.telegram.org/bots/api#formatting-options
const mssg = async (chatId, txt, type = null) => {


    if (type == 'html') {

        bot.sendMessage(chatId, txt, { parse_mode: 'HTML' });

    } else if (type == "photo") {

        bot.sendPhoto(chatId, txt);

    } else if (type == "qr-code") {

        const url = txt;
        sendQrCode(chatId, url);


    } else {

        bot.sendMessage(chatId, txt);
    }



}


module.exports = { start, mssg };


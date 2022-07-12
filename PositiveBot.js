const TeleBot = require('telebot');
//Make the buttons cute and adorable
const BUTTONS = {
    motivation: {
        label: '👊🏼 Motivate Me',
        command: '/Motivation'
    },
    love: {
        label: '💖 Love Me',
        command: '/Love'
    }
};
//Bot Configurations
const bot = new TeleBot({
    token: '660770830:AAEMaMYMa2NRiGP7PjXVk0T-dC1i89iAsQI',
    usePlugins: ['namedButtons'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS
        }
    }
});

//Loading quotes from motivationlib.json & lovelib.json and mapping it to a variable.
const ml = require('./motivationlib.json');
const ll = require('./lovelib.json');
//Mapping the respective Values to their variable
var motivation = ml.map(current => current.MotivationQuote);
var love = ll.map(current => current.LoveQuote);
//Debug bby~
console.log("List of our motivation quotes: ", motivation);
console.log("List of our love quotes: ", love)

//Telegram bot /start command action
bot.on(['/start','Hello', 'sticker', 'audio'], msg => {

    let replyMarkup = bot.keyboard([
        [BUTTONS.motivation.label, BUTTONS.love.label]
    ], {resize: true});

    return bot.sendMessage(msg.from.id, `Hano ${ msg.from.first_name }!`, {replyMarkup});

});

// Press on mi buttons for some motivation bby <3
var mnumbers = [];
bot.on('/Motivation', msg => {

    
    while(mnumbers.length < motivation.length){
        var number = Math.floor(Math.random()*motivation.length)
        if(mnumbers.indexOf(number) === -1){
            mnumbers.push(number)
            var MotivationQuote = motivation[number]
            return bot.sendMessage(msg.from.id, `${MotivationQuote}`);
        }
    }
    return bot.sendMessage(msg.from.id, 'POOOOO you have seen all the quotes poo poo blu has prepared for you!');
    //var MotivationQuote = motivation[Math.floor(Math.random()*motivation.length)]
    //return bot.sendMessage(msg.from.id, `${MotivationQuote}`);

});

//Press on mi buttons for some love bby <3 not sexy time tho, i'm abstinent
var lnumbers = [];
bot.on('/Love', msg => {

    while(lnumbers.length < love.length){
        var number = Math.floor(Math.random()*love.length)
        if(lnumbers.indexOf(number) === -1){
            lnumbers.push(number)
            var LoveQuote = love[number]
            return bot.sendMessage(msg.from.id, `${LoveQuote}`);
        }
    }
    return bot.sendMessage(msg.from.id, 'POOOOO you have reached the end of blublu\'s love quotes but that doesn\'t mean it\'s the end of blublu\'s love for dudu hehehe <3 love you baby muacks 😚');
    //var LoveQuote = love[Math.floor(Math.random()*love.length)]
    //return bot.sendMessage(msg.from.id, `${LoveQuote}`);
    //return bot.sendMessage(msg.from.id, "Under Construction... Please come back later poo poo");

});

//START THE BOT!!!!!!!!!!!
bot.start();
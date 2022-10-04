const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options')
const token = '5757524709:AAGVmXWObfkrMQ4D51rdW82afr0uzifo8E4';
const bot = new TelegramApi(token, {polling: true});

// аналог БД, где ключ - это ID чата, а зн-е - загаданное ботом число
const chats = {}

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, попробуй угадать!`, gameOptions)

  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber;
}

const start = () => {
  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    bot.setMyCommands([
      {command: '/start', description: 'Начальное приветствие'},
      {command: '/info', description: 'Получить инфо о пользователе'},
      {command: '/game', description: 'Игра угадай цифру'}
    ])  
  
    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/0b1/31b/0b131ba6-af59-4dbe-a0cb-5abcda5bc6be/1.webp')
      return bot.sendMessage(chatId, 'Добро пожаловать в бот. Пока я ничего не умею, но скоро..')
    }
    if (text === '/info') {
      // bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
    }
    if (text === '/game') {
      return startGame(chatId)
    }

    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз!')
  });

  bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === '/again') {
      return startGame(chatId)
    }

    if (data === chats[chatId]) {
      return bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats[chatId]}!`, againOptions)
    } else {
      return bot.sendMessage(chatId, `К сожалению, ты не угадал. Бот загадал цифру ${chats[chatId]}!`, againOptions)
    }
  })
}

start()
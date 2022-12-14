const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options')
const token = '5757524709:AAGVmXWObfkrMQ4D51rdW82afr0uzifo8E4'; // токен из чатат с ботом

// 6. создаём бота с базовыми опциями в П. bot
const bot = new TelegramApi(token, {polling: true});

// 13. аналог БД, где ключ - это ID сообщения - нажатая юзером цифра, а зн-е - загаданное ботом число
const chats = {}

// 19 чтобы не дублировать код, вынесем всю логику генерации числа ботом в Ф. startGame(chatId)
const startGame = async (chatId) => {
  await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, попробуй угадать!`, gameOptions)

  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывай...')
}

// 10. Ф. для запуска приложения
const start = () => {
  // 8. Получаем id и ответ юзера, чтобы их обрабоать слушателем .on()
  bot.on('message', async msg => {
    // console.log(msg);
    const text = msg.text; // текст, кот отправил юзер
    const chatId = msg.chat.id; // id юзера

  // 7. Т.О. мы создаём команды '/start', '/info' и т.д.
    bot.setMyCommands([
      {command: '/start', description: 'Начальное приветствие'},
      {command: '/info', description: 'Получить инфо о пользователе'},
      {command: '/game', description: 'Игра угадай цифру'}
    ])  
  
  // 9. Обрабатываем команды, которые ввёл юзер, как созданные здесь, так и непредусмотренные
    if (text === '/start') {
      // ссылку на стикер получили на сайте tlgrm.ru/stickers
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/0b1/31b/0b131ba6-af59-4dbe-a0cb-5abcda5bc6be/1.webp')
      // ответ сообщением на нажатие кнопки с командой '/start'
      return bot.sendMessage(chatId, 'Добро пожаловать в бот. Пока я ничего не умею, но скоро..')
    }
    if (text === '/info') {
      // bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
      // ответ сообщением на нажатие кнопки с командой '/info'
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
    }
    if (text === '/game') {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз!')
  });

  // 16. Чтобы кнопки игры реагировали, повесим на них слушателя события 'callback_query'
  bot.on('callback_query', msg => {
    // console.log(msg);
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === '/again') {
      return startGame(chatId)
    }
// 17 Проверяем и обрабатываем ответ юзера
    if (data === chats[chatId]) {
      return bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats[chatId]}!`, againOptions)
    } else {
      return bot.sendMessage(chatId, `К сожалению, ты не угадал. Бот загадал цифру ${chats[chatId]}!`, againOptions)
    }
  })
}

start()



// 21 Остаётся подключаться к БД и сохранять туда отгаданные и неотгаданные цифры

// 20 Чтобы бот работал 24/7, его нужно задеплоить на облачный сервис.
// Чтобы задеплоить, отправим игру на GitHub, внеся исключения в .gitignore

// 19 Чтобы кнопка "Играть ещё раз" реагировала, при её нажатии дожно генерироваться новое число.
// чтобы не дублировать код, вынесем всю логику генерации числа ботом в Ф. startGame(chatId)

// 18 Создаём кнопку "Играть ещё раз", чтобы каждый раз не идти в меню -> '/game'
// Логика кнопки вынесена в модуль options.js

// 17 Проверяем и обрабатываем ответ юзера

// 16. Чтобы кнопки реагировали, повесим на них слушателя события 'callback_query'

// 14. Создадим кнопки для Нажатия юзером, вынесем эту логику в модуль options.js
// Метод .sendMessage() 3м параметром принимает О. form. С помощью него будет отправлять юзеру кнопки

// 13. Создадим аналог БД для игры. После генерации раномного числа, в. О. chats
// добавляется поле с ID сообщения и рандомное число как зн-е поля

// 12. создаём игру в Ф. startGame(), запуск которой привязываем к кнопке '/game' из меню.
// Отправим юзеру сообщение о начале игры
// Сгенерим радномное число

// 11. Весь код обработки сообщений помещаем в Ф. start(). Она будет запускать приложение.

// 10. Ф-и по работе с ботами как правило являются асинхронными.

// 9. Обрабатываем команды, которые ввёл юзер, как созданный здесь, так и непредусмотренные
// Команды юзера можно обрабатывать по рег выражению.

// 8. Первым делом вешаем слушателя для обработки входящих сообщений,
// т.е. мы получаем о обрабатываем О. message, сод-й тех инфу о прилетевшем сообщении,
// например, message.text содержит текст, введённый юзером

// У экземпляра класса TelegramApi, т.е. у нашего бота, доступен список методов благодаря API
// одной из них явл метод '.setMyCommands()', он позволяет создать команды для взаимодействия с ботом.
// Метод принимает в качестве параметра массив Объектов. В О. д.б. поля 'command' и 'description'
// 7. Т.О. мы создаём команды '/start', '/info' и т.д.

// 6. создаём бота с базовыми опциями в П. bot. Запускаем бота командой
// npm run dev
// самого бота можно найти по ссылке в Тг, присланной от BotFather.

// 5. В файле 'package.json' прописываем скрипты 'dev' и 'start' для запуска Аппа
// 'dev': запускать Index.js с помощью nodemon
// 'start': скрипт для продакшена, запускать Index.js с помощью Нода

// 4. Импортим уст-й пакет в П. TelegramApi

// 3. Устанавливаем модуль для работы с API телеги
// исполняем команду nmp i node-telegram-bot-api nodemon
// флаг 'nodemon' уст модуль для автоперезагрузки сервера при изменении в коде

// 2. Инициализируем проект в IDE
// В терминале в переходим в папку проекта, исполняем команду 'npm init'

// 1. Создаём тг-бота.
// находим в ТГ бот BotFather, кликаем команду /newbot, вводим название, уникальный юзернэйм, чтобы найти его в поиске (оканчивается всегда на 'bot'), копируем присланный токен.

// Сам ролик: https://www.youtube.com/watch?v=slcqnHIFrj8&ab_channel=UlbiTV
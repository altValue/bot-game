module.exports = {
  // 14. Создадим кнопки для Нажатия юзером
  gameOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
        [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
        [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
        [{text: '0', callback_data: '0'}]
      ]
    })
  },  
  // 18 Создаём кнопку "Играть ещё раз", чтобы каждый раз не идти в меню -> '/game'
  // Как юзер выберет цифру, ему прилетит эта кнопка
  againOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text: 'Играть ещё раз', callback_data: '/again'}]
      ]
    })
  }
}



// 15. Для создания кнопок создадим О. gameOptions с одним полем - reply_markup, т.е. размеченный ответ, ответ в виде формы.
// Кнопки с цифрами создаём в массиве inline_keyboard. Каждый маасив массива inline_keyboard - это строка
// кнопок в телеге. Сами кнопки - это О. с полем текста НА кнопке 'text' и полем ответа от сервера callback_data
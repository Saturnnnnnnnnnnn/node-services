const express = require('express');
const { getWeatherByCity } = require('./weather');
// eslint-disable-next-line no-unused-vars
const app = express();
const port = 3001; // Второй сервис будет работать на порту 3001

// Маршрут для отображения страницы с информацией о погоде
app.get('/', async (req, res) => {
  try {
    const weatherData = await getWeatherByCity('New York');

    // Форматирование данных для вывода в браузер
    const formattedData = `
      <html>
        <head>
          <title>Погода в ${weatherData.Город}</title>
        </head>
        <body>
          <h1>Погода в ${weatherData.Город}</h1>
          <p><strong>Погода:</strong> ${weatherData.Погода}</p>
          //<p><strong>Описание:</strong> ${weatherData.Описание}</p>
          <p><strong>Температура:</strong></p>
          <ul>
            <li>Текущая: ${weatherData.Температура.Текущая}</li>
            <li>Ощущается как: ${weatherData.Температура['Ощущается как']}</li>
            <li>Минимальная: ${weatherData.Температура.Минимальная}</li>
            <li>Максимальная: ${weatherData.Температура.Максимальная}</li>
          </ul>
          <p><strong>Влажность:</strong> ${weatherData.Влажность}</p>
          <p><strong>Ветер:</strong></p>
          <ul>
            <li>Скорость: ${weatherData.Ветер.Скорость}</li>
            <li>Направление: ${weatherData.Ветер.Направление}</li>
          </ul>
          <button onclick="window.location.href='http://localhost:3000'">Перейти к первому сервису</button>
          <button onclick="window.location.href='http://localhost:3002'">Перейти к третьему сервису</button>

        </body>
      </html>
    `;

    res.send(formattedData);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).send('Ошибка при получении данных о погоде');
  }
});

// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

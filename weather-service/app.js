const express = require('express');
const { getWeatherByCity } = require('./weather');

const app = express();
const port = 3001;

app.get('/', async (req, res) => {
  try {
    const weatherData = await getWeatherByCity('New York');

    const formattedData = `
      <html>
        <head>
          <title>Погода в ${weatherData.Город}</title>
        </head>
        <body>
          <h1>Погода в ${weatherData.Город}</h1>
          <p><strong>Погода:</strong> ${weatherData.Погода}</p>
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
          <button onclick="window.location.href='http://localhost:3000'">Перейти к сервису 1</button>
          <button onclick="window.location.href='http://localhost:3002'">Перейти к сервису 3</button>
        </body>
      </html>
    `;

    res.send(formattedData);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).send('Ошибка при получении данных о погоде');
  }
});

const server = app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

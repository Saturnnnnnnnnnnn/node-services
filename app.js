const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Обработка запроса на главной странице
app.get('/', async (req, res) => {
  res.send(`
    <html>
      <head>
        <title>IP-адрес</title>
        <script>
          // Функция для запроса и отображения внешнего IP-адреса
          async function getExternalIPAddress() {
            try {
              const response = await fetch('/ip');
              const ip = await response.text();
              document.getElementById('ip-address').textContent = ip;
            } catch (error) {
              console.error('Ошибка получения IP-адреса:', error.message);
            }
          }

          // Функция для перехода ко второму сервису
          function goToWeatherService() {
            window.location.href = 'http://localhost:3001'; // Измените URL, если нужно
          }

          // Функция для перехода к третьему сервису
          function goToSystemService() {
            window.location.href = 'http://localhost:3002'; // Измените URL, если нужно
          }
        </script>
      </head>
      <body>
        <h1>Проверка ip</h1>
        <button onclick="getExternalIPAddress()">Показать IP-адрес</button>
        <p id="ip-address"></p>
        <button onclick="goToWeatherService()">Переход на второй сервис</button> <!-- Добавленная кнопка для перехода -->
        <button onclick="goToSystemService()">Переход на третий сервис</button> <!-- Добавленная кнопка для перехода -->
      </body>
    </html>
  `);
});

// Маршрут для возвращения внешнего IP-адреса
app.get('/ip', async (req, res) => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const ip = response.data.ip;
    res.send(ip);
  } catch (error) {
    console.error('Ошибка получения внешнего IP-адреса:', error.message);
    res.status(500).send('Ошибка получения внешнего IP-адреса');
  }
});

// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`); // ESLint игнорирует эту строку
});

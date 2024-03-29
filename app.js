const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Обработка запроса на главной странице
app.get('/', async (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Получить внешний IP-адрес</title>
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
        </script>
      </head>
      <body>
        <h1>Внешний IP-адрес вашего хоста!:</h1>
        <button onclick="getExternalIPAddress()">Получить IP-адрес!</button>
        <p id="ip-address"></p>
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

// Запуск сервера
const server = app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

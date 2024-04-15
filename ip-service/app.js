const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose(); // Подключаем SQLite

const app = express();
const port = 3000;

// Создаем подключение к базе данных SQLite
const db = new sqlite3.Database('../data/ip_addresses.db');

// Создаем таблицу для хранения IP-адресов, если она не существует
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS ip_addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT)");
});

// Маршрут для сохранения IP-адреса в базу данных
app.post('/save-ip', express.json(), (req, res) => {
  const ip = req.body.ip; // Получаем IP-адрес из тела запроса
  // Вставляем IP-адрес в таблицу базы данных
  db.run("INSERT INTO ip_addresses (ip) VALUES (?)", [ip], (err) => {
    if (err) {
      console.error('Ошибка при сохранении IP-адреса:', err.message);
      res.status(500).send('Ошибка при сохранении IP-адреса');
    } else {
      console.log('IP-адрес успешно сохранен в базе данных');
      res.status(200).send('IP-адрес успешно сохранен в базе данных');
    }
  });
});

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

          // Функция для сохранения IP-адреса в базу данных
          async function saveIPAddress() {
            try {
              const response = await fetch('/save-ip', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ip: document.getElementById('ip-address').textContent })
              });
              const message = await response.text();
              console.log(message);
              alert(message); // Выводим сообщение об успешном сохранении на интерфейсе
            } catch (error) {
              console.error('Ошибка сохранения IP-адреса:', error.message);
              alert('Ошибка сохранения IP-адреса');
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
        <button onclick="saveIPAddress()">Сохранить в базе</button> <!-- Добавленная кнопка для сохранения -->
        <button onclick="goToWeatherService()">Переход к сервиву 2</button> <!-- Добавленная кнопка для перехода -->
        <button onclick="goToSystemService()">Перезод к сервису 3</button> <!-- Добавленная кнопка для перехода -->
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

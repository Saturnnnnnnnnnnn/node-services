const express = require('express');
const os = require('os');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  // Получаем информацию о системе
  const systemInfo = {
    hostname: os.hostname(),
    type: os.type(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    uptime: os.uptime(),
    cpus: os.cpus(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
  };

  // Форматируем информацию о процессорах в одну строку
  const cpuInfo = `${systemInfo.cpus.length} процессора, Модель: ${systemInfo.cpus[0].model}, Скорость: ${systemInfo.cpus[0].speed} MHz`;

  // Отправляем HTML-страницу с информацией о системе и кнопками для перехода на другие сервисы
  res.send(`
    <html>
      <head>
        <title>Информация о системе</title>
      </head>
      <body>
        <h1>Информация о системе</h1>
        <p><strong>Имя хоста:</strong> ${systemInfo.hostname}</p>
        <p><strong>Тип операционной системы:</strong> ${systemInfo.type}</p>
        <p><strong>Платформа:</strong> ${systemInfo.platform}</p>
        <p><strong>Архитектура процессора:</strong> ${systemInfo.arch}</p>
        <p><strong>Версия операционной системы:</strong> ${systemInfo.release}</p>
        <p><strong>Время работы системы:</strong> ${systemInfo.uptime} секунд</p>
        <p><strong>Информация о процессорах:</strong> ${cpuInfo}</p>
        <p><strong>Общий объем памяти:</strong> ${Math.round(systemInfo.totalMemory / 1024 / 1024)} MB</p>
        <p><strong>Свободная память:</strong> ${Math.round(systemInfo.freeMemory / 1024 / 1024)} MB</p>
        <form action="http://localhost:3000" method="get">
          <button type="submit">Перейти к сервису 1</button>
        </form>
        <form action="http://localhost:3001" method="get">
          <button type="submit">Перейти к сервису 2</button>
        </form>
      </body>
    </html>
  `);
});

// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`); // ESLint игнорирует эту строку
});

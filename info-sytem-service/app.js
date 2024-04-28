const express = require('express');
const os = require('os');

// Определение функции для форматирования данных о памяти в мегабайты
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const app = express();
const port = 3002;

app.get('/', (req, res) => {
  const systemInfo = {
    hostname: os.hostname(),
    os_type: os.type(),
    platform: os.platform(),
    cpu_architecture: os.arch(),
    os_version: os.release(),
    uptime: os.uptime(),
    total_memory: os.totalmem(),
    free_memory: os.freemem(),
  };

  const cpuInfo = `${os.cpus().length} процессора, Модель: ${os.cpus()[0].model}, Скорость: ${os.cpus()[0].speed} MHz`;

  res.send(`
    <html>
      <head>
        <title>Информация о системе</title>
      </head>
      <body>
        <h1>Информация о системе</h1>
        <p><strong>Имя хоста:</strong> ${systemInfo.hostname}</p>
        <p><strong>Тип операционной системы:</strong> ${systemInfo.os_type}</p>
        <p><strong>Платформа:</strong> ${systemInfo.platform}</p>
        <p><strong>Архитектура процессора:</strong> ${systemInfo.cpu_architecture}</p>
        <p><strong>Версия операционной системы:</strong> ${systemInfo.os_version}</p>
        <p><strong>Время работы системы:</strong> ${systemInfo.uptime} секунд</p>
        <p><strong>Информация о процессорах:</strong> ${cpuInfo}</p>
        <p><strong>Общий объем памяти:</strong> ${Math.round(systemInfo.total_memory / 1024 / 1024)} MB</p>
        <p><strong>Свободная память:</strong> ${Math.round(systemInfo.free_memory / 1024 / 1024)} MB</p>
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

const server = app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

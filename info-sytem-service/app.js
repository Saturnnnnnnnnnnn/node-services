const express = require('express');
const os = require('os');
const sqlite3 = require('sqlite3').verbose();

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

const db = new sqlite3.Database('../data/info_system_service.db');

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
        <form action="/save" method="post">
          <button type="submit">Сохранить информацию</button>
        </form>
        <div id="successMessage" style="display: none;">Информация о системе успешно сохранена в базе данных</div>
        <script>
          if (window.location.search.includes('saved=true')) {
            document.getElementById('successMessage').style.display = 'block';
          }
        </script>
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

app.post('/save', async (req, res) => {
  try {
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

    await db.run(
      `INSERT INTO info_system_service_data (hostname, os_type, platform, cpu_architecture, os_version, uptime, total_memory, free_memory, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        systemInfo.hostname,
        systemInfo.os_type,
        systemInfo.platform,
        systemInfo.cpu_architecture,
        systemInfo.os_version,
        systemInfo.uptime,
        systemInfo.total_memory,
        systemInfo.free_memory,
      ],
      function (err) {
        if (err) {
          console.error('Ошибка сохранения информации о системе:', err.message);
          res.status(500).send('Ошибка при сохранении информации о системе');
        } else {
          console.log('Информация о системе успешно сохранена в базе данных');
          res.send(`
            <script>
              alert('Информация о системе успешно сохранена в базе данных');
              window.location.href = '/';
            </script>
          `); // Выводим сообщение об успешном сохранении и перезагружаем текущую страницу
        }
      }
    );
  } catch (error) {
    console.error('Ошибка сохранения информации о системе:', error.message);
    res.status(500).send('Ошибка при сохранении информации о системе');
  }
});

const server = app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

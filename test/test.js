const { ESLint } = require('eslint');

test('lint code with ESLint', async () => {
  // Создаем новый экземпляр ESLint
  const eslint = new ESLint();

  // Запускаем ESLint на нашем коде для всех файлов
  const results = await eslint.lintFiles(['app.js', 'info-sytem-service/app.js', 'weather-service/app.js', 'weather-service/weather.js']);

  // Проверяем, что результаты не содержат ошибок или предупреждений
  results.forEach(result => {
    expect(result.errorCount).toBe(0);
    expect(result.warningCount).toBe(0);
  });
});

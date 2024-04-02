const axios = require('axios');

async function getWeatherByCity(city) {
  try {
    // Выполняем запрос к API OpenWeatherMap для получения данных о погоде
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=57bba2fbb55de86f5c74ec00faae46a3&units=metric`);
    const weatherData = {
      Город: response.data.name,
      Погода: response.data.weather[0].main,
      Описание: response.data.weather[0].description,
      Температура: {
        Текущая: `${response.data.main.temp}°C`,
        'Ощущается как': `${response.data.main.feels_like}°C`,
        Минимальная: `${response.data.main.temp_min}°C`,
        Максимальная: `${response.data.main.temp_max}°C`
      },
      Влажность: `${response.data.main.humidity}%`,
      Ветер: {
        Скорость: `${response.data.wind.speed} м/с`,
        Направление: `${response.data.wind.deg}°`
      }
    };
    return weatherData;
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    throw new Error('Ошибка при получении данных о погоде');
  }
}

module.exports = { getWeatherByCity };

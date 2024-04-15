const axios = require('axios');

// Функция для получения данных о погоде по заданному городу
async function getWeatherByCity(city) {
  try {
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

// Функция для сохранения данных о погоде в базу данных
async function saveWeatherToDB(city) {
  try {
    const weatherData = await getWeatherByCity(city);
    // Здесь сохраняем погодные данные в базу данных
    console.log('Данные о погоде сохранены в базе данных:', weatherData);
  } catch (error) {
    console.error('Ошибка при сохранении данных о погоде:', error);
    throw new Error('Ошибка при сохранении данных о погоде');
  }
}

module.exports = { getWeatherByCity, saveWeatherToDB };

import axios from 'axios';

const API_KEY = 'df4fb2f0bdfc840acec77f2995aea8d2';
const BASE_URL = 'http://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, appid: API_KEY, units: 'metric' },
  });
  return response.data;
};

export const getForecastByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, appid: API_KEY, units: 'metric' },
  });
  return response.data;
};

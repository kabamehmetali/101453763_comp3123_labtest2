// src/api.js
import axios from 'axios';

const API_KEY = 'df4fb2f0bdfc840acec77f2995aea8d2';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = (city) => {
    return axios.get(`${BASE_URL}/weather`, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
        },
    });
};

export const fetchForecast = (city) => {
    return axios.get(`${BASE_URL}/forecast`, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
        },
    });
};

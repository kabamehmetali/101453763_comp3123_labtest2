
import React from 'react';

const WeatherCard = ({ weather, city, isToday }) => {
    const { dt_txt, main, weather: weatherDetails } = weather;
    const dateObj = new Date(dt_txt);
    const day = dateObj.toLocaleDateString(undefined, { weekday: 'long' });
    const date = dateObj.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
    const iconUrl = `http://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

    return (
        <div className={`weather-card ${isToday ? 'today-card' : ''}`}>
            {isToday && <div className="today-label">Today</div>}
            <h3>{`${day}, ${city}`}</h3>
            <p>{date}</p>
            <img src={iconUrl} alt={weatherDetails[0].description} />
            <p className="description">{weatherDetails[0].description}</p>
            <p className="temp">Temp: {main.temp}°C</p>
            <p className="humidity">Humidity: {main.humidity}%</p>
        </div>
    );
};

export default WeatherCard;

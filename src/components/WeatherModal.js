
import React from 'react';

const WeatherModal = ({ weather, city, onClose }) => {
    if (!weather) return null;

    const { main, weather: weatherDetails, wind, dt_txt } = weather;
    const iconUrl = `http://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;
    const dateObj = new Date(dt_txt || Date.now());
    const day = dateObj.toLocaleDateString(undefined, { weekday: 'long' });
    const date = dateObj.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="close-button">X</button>
                <h3 className="modal-city">{city}</h3>
                <p className="modal-day">{`${day}, ${date}`}</p>
                <img src={iconUrl} alt={weatherDetails[0].description} />
                <p className="description">{weatherDetails[0].description}</p>
                <p>Temperature: {main.temp}°C</p>
                <p>Feels Like: {main.feels_like}°C</p>
                <p>Humidity: {main.humidity}%</p>
                <p>Wind Speed: {wind.speed} m/s</p>
            </div>
        </div>
    );
};

export default WeatherModal;

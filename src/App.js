// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import WeatherCard from './components/WeatherCard';
import WeatherModal from './components/WeatherModal';
import { fetchWeather, fetchForecast } from './api';

const App = () => {
    const [city, setCity] = useState('Toronto');
    const [displayCity, setDisplayCity] = useState('Toronto'); // Dynamic city display
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedWeather, setSelectedWeather] = useState(null);

    useEffect(() => {
        const getWeatherData = async () => {
            setLoading(true);
            setError(null);
            try {
                const weatherResponse = await fetchWeather(city);
                const forecastResponse = await fetchForecast(city);

                const todayWeather = {
                    ...weatherResponse.data,
                    dt_txt: new Date().toISOString(),
                };

                const dailyData = forecastResponse.data.list.filter((reading) =>
                    reading.dt_txt.includes('12:00:00')
                );

                const combinedForecast = [todayWeather, ...dailyData];
                setForecast(combinedForecast);
                setDisplayCity(capitalize(city)); // Set capitalized city name
            } catch (err) {
                setError('Failed to fetch weather data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        getWeatherData();
    }, [city]);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleSearch = (searchedCity) => {
        setCity(searchedCity);
    };

    const handleCardClick = (weather) => {
        if (weather.name) {
            setDisplayCity(capitalize(weather.name)); // Update city name dynamically
        }
        setSelectedWeather(weather);
    };

    const handleCloseModal = () => {
        setSelectedWeather(null);
    };

    return (
        <div className="app">
            <Navbar title="Weather App" onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <>
                    <h2>{displayCity}</h2>
                    <div className="weather-cards-container">
                        {forecast.map((weather, index) => (
                            <div
                                key={index}
                                onClick={() => handleCardClick(weather)}
                                className={`card-wrapper ${index === 0 ? 'today-card' : ''}`}
                            >
                                <WeatherCard
                                    weather={weather}
                                    city={capitalize(city)}
                                    isToday={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
            {selectedWeather && (
                <WeatherModal
                    weather={selectedWeather}
                    city={displayCity} // Pass the city name to the modal
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default App;

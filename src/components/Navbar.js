
import React, { useState } from 'react';
import axios from 'axios';

const Navbar = ({ title, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const API_KEY = 'df4fb2f0bdfc840acec77f2995aea8d2';

    const handleInputChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.length > 2) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${term}&limit=5&appid=${API_KEY}`
                );
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching city suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (cityName) => {
        setSearchTerm(cityName);
        setSuggestions([]);
        onSearch(cityName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            onSearch(searchTerm);
            setSuggestions([]);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-title">{title}</div>
            <div className="navbar-search-container">
                <form onSubmit={handleSubmit} className="navbar-search">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search city..."
                        required
                    />
                    <button type="submit">Search</button>
                </form>
                {suggestions.length > 0 && (
                    <ul className="autocomplete-list">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="autocomplete-item"
                                onClick={() => handleSelectSuggestion(suggestion.name)}
                            >
                                {suggestion.name}, {suggestion.country}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

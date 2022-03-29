import React from 'react';
import Icon from './Icon';

function WeatherDetails({ weatherObject }) {
    const { dt, weather, temp, humidity } = weatherObject;
    return (
        <div className="weather-details">
            <span className="weather-details__date">{new Date(dt * 1000).toDateString()}</span>
            <Icon code={weather[0].icon} />
            <span className="weather-details__temp">{Math.floor(temp.day)}°C</span>
            <span className="weather-details__main">{weather[0].main}</span>
            <div className="weather-details__minor">
                <span>Night: {Math.floor(temp.night)}°C</span>
                <span>Morning: {Math.floor(temp.morn)}°C</span>
                <span>Humidity: {humidity}%</span>
            </div>
        </div>
    );
}

export default WeatherDetails;

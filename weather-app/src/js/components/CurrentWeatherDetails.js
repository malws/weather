import React from 'react';
import Icon from './Icon';

function CurrentWeatherDetails({ weatherObject }) {
    const { dt, weather, temp, humidity } = weatherObject;

    return (
        <div className="current-weather">
            <span className="current-weather__date">{new Date(dt * 1000).toDateString()}</span>
            <Icon code={weather[0].icon} />
            <span className="current-weather__temp">{Math.floor(temp)}°C</span>
            <span className="current-weather__main">{weather[0].main}</span>
            <span className="current-weather__humidity">Humidity: {humidity}%</span>
        </div>
    );
}

export default CurrentWeatherDetails;

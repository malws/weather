import React from 'react';

function Icon({ code }) {
    const src = `http://openweathermap.org/img/wn/${code}@4x.png`;

    return (
        <div className="weather-icon">
            <img src={src} alt="weather" />
        </div>
    );
}

export default Icon;

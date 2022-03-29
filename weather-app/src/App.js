import { React, useState, useEffect } from 'react';
import './scss/App.scss';
import axios from 'axios';
import CurrentWeatherDetails from './js/components/CurrentWeatherDetails';
import WeatherDetails from './js/components/WeatherDetails';
import WeatherStats from './js/components/WeatherStats';

function App() {
    const [error, setError] = useState('');
    const [cityName, setCityName] = useState('');
    const [currentCityName, setCurrentCityName] = useState('');
    const [coords, setCoords] = useState({ latitude: null, longitude: null });
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const key = '86507139167fb5a1b4bf177fa259beb6';

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                setCoords({ latitude: latitude, longitude: longitude });
                getCityNameFromCoordinates(latitude, longitude);
            });
        }
    }, []);

    useEffect(() => {
        let { latitude, longitude } = coords;
        if (latitude && longitude) getWeather(latitude, longitude);
    }, [coords]);

    function getCityCoords(event) {
        event.preventDefault();
        getCoordinatesFromCityName();
    }

    function getWeather(latitude, longitude) {
        setError('');
        setLoading(true);
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${key}`
            )
            .then((response) => {
                setWeatherData(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Something went wrong!');
            });
    }

    function getCityNameFromCoordinates(latitude, longitude) {
        axios
            .get(
                `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${key}`
            )
            .then(({ data }) => {
                setCurrentCityName(data[0].name);
            })
            .catch(() => {
                setError('Something went wrong!');
            });
    }

    function getCoordinatesFromCityName() {
        if (cityName !== '')
            axios
                .get(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`
                )
                .then((response) => {
                    if (response.data[0]) {
                        setCoords({
                            latitude: response.data[0].lat,
                            longitude: response.data[0].lon,
                        });
                        setCurrentCityName(response.data[0].name);
                    } else {
                        setError('City not found!');
                        reset();
                    }
                })
                .catch(() => {
                    setError('Something went wrong!');
                });
    }

    function reset() {
        setWeatherData(null);
        setCityName('');
        setCurrentCityName('');
        setCoords({ latitude: null, longitude: null });
    }

    function handleCityChange(event) {
        let city = event.target.value;
        setCityName(city);
    }

    return (
        <div className="container">
            <form className="search-form" onSubmit={getCityCoords}>
                <button className="search-form__button" type="submit">
                    Search
                </button>
                <span className="search-form__input">
                    <input type="text" value={cityName} onChange={handleCityChange} />
                </span>
            </form>
            <div className="error">{error}</div>
            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                <div className="weather">
                    <h1 className="weather__city">{currentCityName}</h1>
                    {weatherData ? (
                        <div>
                            <CurrentWeatherDetails weatherObject={weatherData.current} />
                            <div className="weather__daily">
                                {weatherData.daily.map(
                                    (weather, index) =>
                                        index < 5 && (
                                            <WeatherDetails key={index} weatherObject={weather} />
                                        )
                                )}
                            </div>
                            <WeatherStats data={weatherData.daily.slice(0, 4)} />
                        </div>
                    ) : (
                        <div className="weather__message">
                            Search by city name to see weather forecast.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;

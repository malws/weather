import React from "react";
import WeatherDetails from "./CurrentWeatherDetails";

function WeatherForecastDetails({ weatherObject }) {
  return (
    <div className="">
      <WeatherDetails weatherObject={weatherObject} />
    </div>
  );
}

export default WeatherForecastDetails;

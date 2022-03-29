import React from 'react';

function WeatherStats({ data }) {
    function getMinimumTemp() {
        let minTemp = data[0].temp.day;
        for (let i = 1; i < data.length; i++) {
            if (data[i].temp.day < minTemp) minTemp = data[i].temp.day;
        }
        return Math.floor(minTemp);
    }

    function getMaximumTemp() {
        let maxTemp = data[0].temp.day;
        for (let i = 1; i < data.length; i++) {
            if (data[i].temp.day > maxTemp) maxTemp = data[i].temp.day;
        }
        return Math.floor(maxTemp);
    }

    function getMeanTemp() {
        let sum = 0;
        for (let i = 1; i < data.length; i++) {
            sum += data[i].temp.day;
        }
        return Math.floor(sum / 5);
    }

    function getModeTemp() {
        let temps = [];
        const counts = {};
        for (let i = 1; i < data.length; i++) {
            temps.push(Math.floor(data[i].temp.day));
        }
        temps.forEach((temp) => {
            temp in counts ? counts[temp]++ : (counts[temp] = 0);
        });

        let mode;
        let highestNumber = 0;
        Object.entries(counts).forEach(([count, temp]) => {
            if (temp > highestNumber) {
                mode = count;
                highestNumber = temp;
            }
        });

        return mode;
    }

    return (
        data && (
            <div className="weather-stats">
                <div>
                    Min. temperature: <span>{getMinimumTemp()}°C</span>
                </div>
                <div>
                    Max. temperature: <span>{getMaximumTemp()}°C</span>
                </div>
                <div>
                    Mean temperature: <span>{getMeanTemp()}°C</span>
                </div>
                <div>
                    Mode temperature: <span>{getModeTemp() ? getModeTemp() + '°C' : '-'}</span>
                </div>
            </div>
        )
    );
}

export default WeatherStats;

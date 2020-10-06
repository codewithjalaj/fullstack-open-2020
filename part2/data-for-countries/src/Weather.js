import React from 'react';

const Weather = ({ weather }) => {
	return (
		<>
			<h3>Weather in {weather.location?.name}</h3>
			<p>Temperature: {weather.current?.temperature} Celcius</p>
			<p>Weather Description: {weather.current?.weather_descriptions[0]}</p>
			<img width="100" src={weather.current?.weather_icons[0]} alt="hi" />
		</>
	);
};

export default Weather;

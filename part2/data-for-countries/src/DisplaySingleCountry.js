import React from 'react';
import Weather from './Weather';

const DisplaySingleCountry = ({ country, weather }) => {
	return (
		<div key={country.name}>
			<h3>
				{country.name} <br />
				<img width="100" src={country.flag} alt={country.name} />
			</h3>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population.toLocaleString()}</p>
			<h4>Languages Spoken:</h4>
			{country.languages.map((lang) => (
				<li key={lang.name}>{lang.name}</li>
			))}
			<div>
				<Weather weather={weather} />
			</div>
		</div>
	);
};

export default DisplaySingleCountry;

import React from 'react';

const DisplayCountryNames = ({ countries, setCountries }) => {
	const handleClick = (name) => {
		let regex = new RegExp(name, 'gi');
		let clickedCountry = countries.filter((country) => country.name.match(regex));
		setCountries(clickedCountry);
	};

	return countries.map((country) => {
		return (
			<p key={country.name}>
				{country.name} <button onClick={() => handleClick(country.name)}>Show</button>
			</p>
		);
	});
};

export default DisplayCountryNames;

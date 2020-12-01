import React from 'react';
import DisplayCountryNames from './DisplayCountryNames';
import DisplaySingleCountry from './DisplaySingleCountry';

const Display = ({ countries, weather, setCountries }) => {
	if (countries.length > 10) {
		return <p>{`${countries.length} total countries. Please refine your search.`}</p>;
	} else if (countries.length <= 10 && countries.length > 1) {
		return <DisplayCountryNames countries={countries} setCountries={setCountries} />;
	} else if (countries.length === 1) {
		return <DisplaySingleCountry weather={weather} country={countries[0]} />;
	}

	return <div></div>;
};

export default Display;

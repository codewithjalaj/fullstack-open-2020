import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Search from './Search';
import Display from './Display';

function App() {
	const [allCountries, setAllCountries] = useState([]);
	const [query, setQuery] = useState('');
	const [countries, setCountries] = useState([]);
	const [weather, setWeather] = useState({});

	// fetch all the countries on first render
	useEffect(() => {
		const fetchCountries = async () => {
			const res = await Axios.get('https://restcountries.eu/rest/v2/all');
			setCountries(res.data);
			setAllCountries(res.data);
		};
		fetchCountries();
	}, []);

	// filter countries base on search query
	useEffect(() => {
		const regex = new RegExp(query, 'gi');
		const filteredCountries = allCountries.filter((country) => country.name.match(regex));
		setCountries(filteredCountries);
	}, [allCountries, query]);

	// get weather data if there is only one country in state
	useEffect(() => {
		if (countries[0]) {
			const api_url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_W_API_KEY}&query=${countries[0].capital}`;
			const fetchWeather = async () => {
				const res = await Axios.get(api_url);
				setWeather(res.data);
			};
			fetchWeather();
		}
	}, [countries]);

	return (
		<>
			<Search setQuery={setQuery} />
			<Display weather={weather} countries={countries} setCountries={setCountries} />
		</>
	);
}

export default App;

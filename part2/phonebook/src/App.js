import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Form from './Form';
import Persons from './Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [query, setQuery] = useState('');

	useEffect(() => {
		Axios.get('http://localhost:3001/persons').then((res) => {
			setPersons(res.data);
		});
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter setQuery={setQuery} />
			<h3>Add a new:</h3>
			<Form
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				persons={persons}
				setPersons={setPersons}
			/>
			<h3>Numbers</h3>
			<Persons persons={persons} query={query} />
		</div>
	);
};

export default App;

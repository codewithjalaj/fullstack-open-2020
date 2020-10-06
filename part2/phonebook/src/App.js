import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Form from './Form';
import Persons from './Persons';
import phonebook from './services/phonebook';

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

	const handleDelete = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			phonebook.deleteEntry(id).then((_) => setPersons(persons.filter((person) => person.id !== id)));
		}
	};

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
			<Persons handleDelete={handleDelete} persons={persons} query={query} />
		</div>
	);
};

export default App;

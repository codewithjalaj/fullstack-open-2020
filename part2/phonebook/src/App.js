import React, { useState } from 'react';
import Filter from './Filter';
import Form from './Form';
import Persons from './Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [query, setQuery] = useState('');

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

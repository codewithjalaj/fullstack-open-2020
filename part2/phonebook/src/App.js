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

	const checkDuplicate = () => {
		for (let person of persons) {
			if (person.name === newName) {
				const popup = window.confirm(
					`${newName} is already added to the phonebook, replace the old number with a new one?`
				);
				let newEntry = {
					name: person.name,
					number: newNumber,
				};
				if (popup) {
					phonebook.updateEntry(person.id, newEntry).then((updatedEntry) => {
						setPersons(persons.map((person) => (person.id !== updatedEntry.id ? person : updatedEntry)));
						setNewName('');
						setNewNumber('');
					});
				}
				return true;
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (newName === '' || newNumber === '') return;

		const duplicate = checkDuplicate();

		// if the entry is duplicate return early.
		if (duplicate) return;

		let newEntry = { name: newName, number: newNumber };

		phonebook.create(newEntry).then((entry) => setPersons(persons.concat(entry)));

		setNewName('');
		setNewNumber('');
	};

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
				handleSubmit={handleSubmit}
			/>
			<h3>Numbers</h3>
			<Persons handleDelete={handleDelete} persons={persons} query={query} />
		</div>
	);
};

export default App;

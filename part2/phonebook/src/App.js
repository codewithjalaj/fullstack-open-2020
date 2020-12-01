import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Form from './Form';
import Persons from './Persons';
import Notification from './Notification';
import phonebookService from './services/phonebook';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [query, setQuery] = useState('');
	const [notification, setNotification] = useState({
		message: null,
		type: '',
	});

	useEffect(() => {
		phonebookService.getAllPersons().then((persons) => setPersons(persons));
	}, []);

	const notify = (message, type) => {
		setNotification({
			message,
			type,
		});

		setTimeout(() => {
			setNotification({
				message: null,
				type: '',
			});
		}, 5000);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (newName === '' || newNumber === '') return;

		const personExists = persons.find((person) => person.name === newName);

		if (personExists) {
			const popup = window.confirm(
				`${newName} is already added to the phonebook, replace the old number with a new one?`
			);

			if (popup) {
				let newEntry = {
					name: personExists.name,
					number: newNumber,
				};
				let id = personExists.id;
				phonebookService
					.updateEntry(id, newEntry)
					.then((updatedEntry) => {
						setPersons(persons.map((person) => (person.id !== id ? person : updatedEntry)));
						setNewName('');
						setNewNumber('');
					})
					.catch((error) => {
						notify(`Entry for ${newName} had already been deleted from server`, 'error');
						setPersons(persons.filter((person) => person.id !== id));
					});

				notify(`Updated ${newName}`, 'success');
			}
		} else {
			let newEntry = { name: newName, number: newNumber };

			phonebookService.create(newEntry).then((entry) => {
				setPersons(persons.concat(entry));
				notify(`Added ${newName} to the phonebook`, 'success');
				setNewName('');
				setNewNumber('');
			});
		}
	};

	const handleDelete = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			phonebookService
				.deleteEntry(id)
				.then((_res) => {
					setPersons(persons.filter((person) => person.id !== id));
					notify(`Deleted Successfully!`, 'success');
				})
				.catch((_err) => {
					setPersons(persons.filter((p) => p.id !== id));
					notify(`${name} had already been deleted from server`, 'error');
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notification.message} type={notification.type} />
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

import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Form from './Form';
import Persons from './Persons';
import Notification from './Notification';
import phonebook from './services/phonebook';

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
		Axios.get(`https://peaceful-ocean-54020.herokuapp.com/api/persons`).then((res) => {
			setPersons(res.data);
		});
	}, []);

	const checkDuplicate = () => {
		for (let person of persons) {
			if (person.name === newName) {
				const popup = window.confirm(
					`${newName} is already added to the phonebook, replace the old number with a new one?`
				);

				if (popup) {
					let newEntry = {
						name: person.name,
						number: newNumber,
					};
					let id = person.id;
					phonebook
						.updateEntry(id, newEntry)
						.then((updatedEntry) => {
							setPersons(persons.map((person) => (person.id !== id ? person : updatedEntry)));
							setNewName('');
							setNewNumber('');
						})
						.catch((error) => {
							setNotification({
								message: `Entry for ${newName} has already ben deleted from server.`,
								type: 'error',
							});

							setTimeout(() => {
								setNotification({
									message: null,
									type: '',
								});
							}, 5000);

							setPersons(persons.filter((person) => person.id !== id));
						});

					setNotification({
						message: `Updated ${newName}`,
						type: 'success',
					});

					setTimeout(() => {
						setNotification({
							message: null,
							type: '',
						});
					}, 5000);
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
		setNotification({
			message: `Added ${newName}`,
			type: 'success',
		});
		setTimeout(() => {
			setNotification({
				message: null,
				type: '',
			});
		}, 5000);
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

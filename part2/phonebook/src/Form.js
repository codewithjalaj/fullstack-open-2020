import React from 'react';
import phonebook from './services/phonebook';

const Form = ({ persons, setPersons, newName, newNumber, setNewName, setNewNumber }) => {
	const handleSubmit = (e) => {
		e.preventDefault();

		if (newName === '' || newNumber === '') return;

		for (let person of persons) {
			if (person.name === newName) {
				return alert(`${newName} is already added to the phonebook.`);
			}
		}

		const newEntry = { name: newName, number: newNumber };

		phonebook.create(newEntry).then((entry) => setPersons(persons.concat(entry)));

		setNewName('');
		setNewNumber('');
	};

	return (
		<form>
			<div>
				name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
			</div>
			<div>
				number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
			</div>
			<div>
				<button onClick={handleSubmit} type="submit">
					add
				</button>
			</div>
		</form>
	);
};

export default Form;

import React from 'react';

const Form = ({ persons, setPersons, newName, newNumber, setNewName, setNewNumber }) => {
	const handleSubmit = (e) => {
		e.preventDefault();

		for (let person of persons) {
			if (person.name === newName) {
				return alert(`${newName} is already added to the phonebook.`);
			}
		}

		if (newName === '' || newNumber === '') return;

		setPersons(persons.concat({ name: newName, number: newNumber }));
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

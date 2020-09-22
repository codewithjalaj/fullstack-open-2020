import React, { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');

	const handleClick = (e) => {
		e.preventDefault();
		setPersons(persons.concat({ name: newName }));
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input onChange={(e) => setNewName(e.target.value)} />
				</div>
				<div>
					<button onClick={handleClick} type="submit">
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p>{person.name}</p>
			))}
		</div>
	);
};

export default App;

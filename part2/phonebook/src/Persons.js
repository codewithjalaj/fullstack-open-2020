import React from 'react';
import Person from './Person';

const Persons = ({ persons, query, handleDelete }) => {
	let regex = new RegExp(query, 'gi');

	return (
		<>
			{persons
				.filter((person) => person.name.match(regex))
				.map((person) => (
					<p key={person.id}>
						<Person handleDelete={handleDelete} person={person} />
					</p>
				))}
		</>
	);
};

export default Persons;

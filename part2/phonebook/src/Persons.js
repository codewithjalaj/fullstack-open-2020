import React from 'react';
import Person from './Person';

const Persons = ({ persons, query }) => {
	let regex = new RegExp(query, 'gi');

	return (
		<>
			{persons
				.filter((person) => person.name.match(regex))
				.map((person, idx) => (
					<p key={idx}>
						<Person person={person} />
					</p>
				))}
		</>
	);
};

export default Persons;

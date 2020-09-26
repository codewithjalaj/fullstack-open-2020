import React from 'react';

const Filter = ({ setQuery }) => {
	return <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search phonebook..." />;
};

export default Filter;

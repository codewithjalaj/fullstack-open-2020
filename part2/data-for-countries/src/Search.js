import React from 'react';

const Search = ({ setQuery }) => {
	return (
		<>
			Find Countries: <input placeholder="Search..." type="text" onChange={(e) => setQuery(e.target.value)} />
		</>
	);
};

export default Search;

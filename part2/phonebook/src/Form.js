import React from 'react';

const Form = ({ handleSubmit, newName, newNumber, setNewName, setNewNumber }) => {
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

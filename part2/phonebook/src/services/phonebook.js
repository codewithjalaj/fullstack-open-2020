import Axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const create = (entry) => {
	const req = Axios.post(baseUrl, entry);
	return req.then((res) => res.data);
};

export default { create };

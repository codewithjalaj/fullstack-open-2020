import Axios from 'axios';
const baseUrl = `https://peaceful-ocean-54020.herokuapp.com/api/persons`;

const create = (entry) => {
	const req = Axios.post(baseUrl, entry);
	return req.then((res) => res.data);
};

const deleteEntry = (id) => {
	const req = Axios.delete(`${baseUrl}/${id}`);
	return req.then((res) => res.data);
};

const updateEntry = (id, entry) => {
	const req = Axios.put(`${baseUrl}/${id}`, entry);
	return req.then((res) => res.data);
};

export default { create, deleteEntry, updateEntry };

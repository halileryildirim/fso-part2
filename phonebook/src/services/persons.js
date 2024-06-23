import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const deletePerson = (personID) => {
  return axios.delete(baseUrl + `/${personID}`);
};

const update = (personID, updatedPerson) => {
  return axios.put(`${baseUrl}/${personID}`, updatedPerson);
};
export default { getAll, create, deletePerson, update };

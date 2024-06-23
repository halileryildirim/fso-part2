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

export default { getAll, create, deletePerson };

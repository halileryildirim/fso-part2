import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const hook = () => {
    personService.getAll().then((response) => {
      setPersons([...response.data]);
    });
  };

  useEffect(hook, [persons]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService.deletePerson(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const personExists = persons.some(
      (person) => person.name === newPerson.name
    );

    if (personExists) {
      alert(`${newName} is already added to phonebook.`);
    } else {
      personService.create(newPerson);
      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchValue} onChange={handleSearch} />

      <h2>add a new</h2>

      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        editName={handleNameChange}
        number={newNumber}
        editNumber={handleNumberChange}
      />
      <h2>Numbers</h2>

      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

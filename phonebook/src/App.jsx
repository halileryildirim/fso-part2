import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons([...response.data]);
    });
  };

  useEffect(hook, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
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
      setPersons([...persons, newPerson]);
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

      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState(null);

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
      setMessage(`Deleted ${name}`);
      personService.deletePerson(id);
      removeMessage();
    }
  };

  const removeMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        personService.update(existingPerson.id, newPerson);
        setMessage(`Updated ${existingPerson.name}`);
        removeMessage();
      }
    } else {
      personService.create(newPerson);
      setMessage(`Added ${newPerson.name}`);
      setNewName("");
      setNewNumber("");
      removeMessage();
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

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

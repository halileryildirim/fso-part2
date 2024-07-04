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
  const [message, setMessage] = useState({ content: null });

  const hook = () => {
    personService
      .getAll()
      .then((response) => {
        setPersons([...response.data]);
      })
      .catch((error) => {
        notificationUpdate(
          "There was an error getting the members list.",
          "error"
        );
        removeNotification();
      });
  };

  useEffect(hook, [message]);

  const notificationUpdate = (content, type = "info") => {
    setMessage({ content, type });
  };

  const removeNotification = () => {
    setTimeout(() => {
      setMessage({ content: null });
    }, 3000);
  };

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
      notificationUpdate(`Deleted ${name}`);
      personService.deletePerson(id).catch((error) => {
        notificationUpdate(`There was an error deleting the ${name}`, "error");
      });
      removeNotification();
    }
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
        personService
          .update(existingPerson.id, newPerson)
          .then((existingPerson) => {
            console.log(existingPerson);
            notificationUpdate(`Updated ${existingPerson.data.name}`);
          })
          .catch((error) => {
            notificationUpdate(error.response.data.error, "error");
          });
        setNewName("");
        setNewNumber("");
        removeNotification();
      }
    } else {
      personService
        .create(newPerson)
        .then((newPerson) => notificationUpdate(`Added ${newPerson.data.name}`))
        .catch((error) => {
          notificationUpdate(error.response.data.error, "error");
        });
      setNewName("");
      setNewNumber("");
      removeNotification();
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

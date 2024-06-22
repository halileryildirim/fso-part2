import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

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
      <div>
        filter shown with <input value={searchValue} onChange={handleSearch} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;

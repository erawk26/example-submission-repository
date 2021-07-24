import React, { useState, useEffect, useCallback } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [results, setResults] = useState(persons);
  const [newStr, setNewStr] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const evtName = evt.target.elements.name.value;
    if (evtName) {
      if (
        persons.map((p) => p.name.toLowerCase()).includes(evtName.toLowerCase())
      ) {
        alert(`${evtName} is already added to phonebook`);
      } else {
        const newPerson = {
          name: evtName,
          number: evt.target.elements.number.value,
        };
        setPersons([newPerson, ...persons]);
        evt.target.reset();
      }
    }
  };
  const handleFilterUpdate = useCallback((str, arr) => {
    setResults([...arr]);
    setNewStr(str);
  }, []);
  const axiosHook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };
  useEffect(axiosHook, []);
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        newStr={newStr}
        persons={persons}
        handleToUpdate={handleFilterUpdate}
      />

      <h3>Add a new</h3>

      <PersonForm handleToSubmit={handleSubmit} />

      <h3>Numbers</h3>

      <Persons persons={results} />
    </div>
  );
};

export default App;

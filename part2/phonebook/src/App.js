import React, { useState, useEffect, useCallback } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [results, setResults] = useState(persons);
  const [newStr, setNewStr] = useState("");
  const getNewId = () => ++persons.map((p) => p.id).sort((a, b) => b - a)[0];
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
          id: getNewId(),
        };
        setPersons([newPerson, ...persons]);
        evt.target.reset();
      }
    }
  };
  const handleFilterUpdate = useCallback((str) => {
    setNewStr(str);
  }, []);
  const filterResults = useCallback((str, arr) => {
    if (str.length) {
      const sNumber = str.replace(/\D/g, "");
      const sName = str.toLowerCase();
      const a = sNumber.length
        ? arr.filter((p) => {
            const pNumber = p.number.replace(/\D/g, "");
            return pNumber.indexOf(sNumber) !== -1;
          })
        : [];
      const b = arr.filter((p) => {
        const pName = p.name.toLowerCase();
        return pName.indexOf(sName) !== -1;
      });
      arr = [...a, ...b];
    }
    return arr;
  }, []);
  const axiosHook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };
  useEffect(axiosHook, []);
  useEffect(
    () => setResults(filterResults(newStr, persons)),
    [newStr, persons, filterResults]
  );
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleToUpdate={handleFilterUpdate} />

      <h3>Add a new</h3>

      <PersonForm handleToSubmit={handleSubmit} />

      <h3>Numbers</h3>

      <Persons persons={results} />
    </div>
  );
};

export default App;

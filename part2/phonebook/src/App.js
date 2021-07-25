import React, { useState, useEffect, useCallback } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [results, setResults] = useState(persons);
  const [newStr, setNewStr] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const evtName = evt.target.elements.name.value;
    if (evtName) {
      const person = persons.find(
        (p) => p.name.toLowerCase() === evtName.toLowerCase()
      );
      if (person) {
        if (
          window.confirm(
            `${person.name} is already in the phonebook. Do you want to update the phone number?`
          )
        ) {
          const evtNum = evt.target.elements.number.value;
          const upsertedPerson = {
            ...person,
            name: evtName,
            number: evtNum.length ? evtNum : person.number,
            updated: Date.now(),
          };
          personService.update(person.id, upsertedPerson).then((response) => {
            console.log({ updated: response });
            setPersons(
              persons.map((p) =>
                p.name.toLowerCase() !== evtName.toLowerCase() ? p : response
              )
            );
          });
        }
      } else {
        const newId = ++persons.map((p) => p.id).sort((a, b) => b - a)[0];
        const newPerson = {
          name: evtName,
          number: evt.target.elements.number.value,
          id: newId,
        };
        personService.create(newPerson).then((response) => {
          console.log({ created: response });
          setPersons(persons.concat(response));
        });
        evt.target.reset();
      }
    }
  };
  const handleRemove = (id) => {
    if (window.confirm("Do you really want to remove?")) {
      personService.remove(id).then((response) => {
        console.log({ removed: response });
        setPersons(persons.filter((p) => p.id !== id));
      });
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
  const onMounted = () => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  };
  useEffect(onMounted, []);
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

      <Persons persons={results} handleToRemove={handleRemove} />
    </div>
  );
};

export default App;

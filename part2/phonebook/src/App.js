import React, { useState, useEffect, useCallback } from "react";
import './App.css'
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import StatusMessage from "./StatusMessage";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [results, setResults] = useState(persons);
  const [newStr, setNewStr] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

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
          personService
            .update(person.id, upsertedPerson)
            .then((response) => {
              console.log({ updated: response });
              setSuccessMsg(
                `${response.name}'s information was successfully to updated.`
              );
              setTimeout(() => {
                setSuccessMsg(null);
              }, 5000);
              setPersons(
                persons.map((p) =>
                  p.name.toLowerCase() !== evtName.toLowerCase() ? p : response
                )
              );
            })
            .catch((error) => {
              setErrorMsg(
                `We were unable to update ${upsertedPerson.name} on the server.`
              );
              console.log({ error });
              setTimeout(() => {
                setErrorMsg(null);
              }, 5000);
              // setPersons(persons.filter(p => p.id !== upsertedPerson.id))
            });
        }
      } else {
        const newId = ++persons.map((p) => p.id).sort((a, b) => b - a)[0];
        const newPerson = {
          name: evtName,
          number: evt.target.elements.number.value,
          id: newId,
        };
        personService
          .create(newPerson)
          .then((response) => {
            console.log({ created: response });
            setSuccessMsg(
              `${response.name} was successfully to added to the phonebook.`
            );
            setTimeout(() => {
              setSuccessMsg(null);
            }, 5000);
            setPersons(persons.concat(response));
          })
          .catch((error) => {
            setErrorMsg(
              `We were unable to add ${newPerson.name} to the server.`
            );
            console.log({ error });
            setTimeout(() => {
              setErrorMsg(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== newPerson.id));
          });
        evt.target.reset();
      }
    }
  };
  const handleRemove = (person) => {
    if (window.confirm("Do you really want to remove?")) {
      personService
        .remove(person.id)
        .then((response) => {
          console.log({ removed: response });
          setSuccessMsg(`${person.name} was successfully deleted.`);
          setTimeout(() => {
            setSuccessMsg(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          setErrorMsg(
            `We were unable to delete ${person.name} from the server.`
          );
          console.log({ error });
          setTimeout(() => {
            setErrorMsg(null);
          }, 5000);
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
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        setErrorMsg(`We were unable to fetch the records from the server.`);
        console.log({ error });
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
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

      <StatusMessage
        msg={errorMsg ? errorMsg : successMsg}
        type={errorMsg ? "error" : "success"}
      />

      <h3>Add a new</h3>
      <PersonForm handleToSubmit={handleSubmit} />

      <h3>Numbers</h3>

      <Persons persons={results} handleToRemove={handleRemove} />
    </div>
  );
};

export default App;

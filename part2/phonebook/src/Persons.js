import React from "react";
const Persons = ({ persons, handleToRemove }) =>
  persons.map((p) => (
    <div key={p.id} id={"person--" + p.id}>
      {p.name}
      {p.number ? ": " + p.number : ""}
      <button onClick={()=>handleToRemove(p.id)}>delete</button>
    </div>
  ));
export default Persons;

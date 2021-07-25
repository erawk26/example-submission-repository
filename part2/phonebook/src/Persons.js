import React from "react";
const Persons = ({ persons }) =>
  persons.map((p) => (
    <div key={p.id} id={"person--" + p.id}>
      {p.name}
      {p.number ? ": " + p.number : ""}
    </div>
  ));
export default Persons;

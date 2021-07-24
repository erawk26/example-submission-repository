import React from "react";
const Persons = ({ persons }) =>
  [...persons].map((p, i) => (
    <div key={i}>
      {p.name}
      {p.number ? ": " + p.number : ""}
    </div>
  ));
export default Persons;

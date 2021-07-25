import React from "react";
import Weather from "./Weather";
const flagStyle = {
  width: "145px",
  height: "auto",
};
const Country = ({ item, size, handleToUpdate }) => {
  const template = {
    teaser: (
      <li className="teaser" key={item.numericCode}>
        {item.name} <button onClick={()=>handleToUpdate(item)}>show</button>
      </li>
    ),
    full: (
      <div className="full" key={item.numericCode}>
        <h2>{item.name}</h2>
        <p>Capital: {item.capital||'N/A'}</p>
        <p>Population: {item.population}</p>
        <h3>Spoken Languages</h3>
        <ul>
          {item.languages.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
        <img
          src={item.flag}
          height="auto"
          width="auto"
          alt={item.name + " Flag"}
          style={flagStyle}
        />
        <Weather location={item} />
      </div>
    ),
  };
  return template[size];
};
export default Country;

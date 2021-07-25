import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Filter from "./Filter";
import CountryList from "./CountryList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newStr, setNewStr] = useState("");
  const endpoints = (str = "", key = "all") => {
    const obj = {
      all: "https://restcountries.eu/rest/v2/all",
      name: `https://restcountries.eu/rest/v2/name/${str}`,
      fullName: `https://restcountries.eu/rest/v2/name/${str}?fullText=true`,
      code: `https://restcountries.eu/rest/v2/alpha/${str}`,
    };
    return obj[key];
  };
  const handleFilterUpdate = useCallback((str) => {
    setNewStr(str);
  }, []);
  const handleCountryUpdate = useCallback((item) => {
    setCountries([item]);
  }, []);
  const axiosHook = () => {
    let ep = newStr.length ? "name" : "all";
    axios
      .get(endpoints(newStr, ep))
      .then((response) => {
        // const statusMsg = `Successfully retrieved countries`;
        // console.log(statusMsg, { response });
        setCountries(response.data);
      })
      .catch((err) => {
        const empty = ep === "name" && err.response.status === 404;
        if (!empty) {
          const statusMsg = `Failed to retrieve countries`;
          console.log(statusMsg, { err });
        } else {
          const statusMsg = `No countries match your search`;
          console.log(statusMsg);
        }
        setCountries([]);
      });
  };
  useEffect(axiosHook, [newStr]);
  return (
    <div>
      Find Countries:{" "}
      <Filter
        handleToUpdate={handleFilterUpdate}
      />
      <CountryList items={countries} handleToUpdate={handleCountryUpdate}/>
    </div>
  );
};

export default App;

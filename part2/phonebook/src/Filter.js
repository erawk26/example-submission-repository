import { useEffect, useCallback } from "react";
const filterResults = (str, arr) => {
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
};

const Filter = ({ newStr, persons, handleToUpdate }) => {
  const handleInput = useCallback(
    (evt) => {
      const str = evt ? evt.target.value : newStr;
      const newResults = filterResults(str, persons);
      handleToUpdate(str, newResults);
    },
    [handleToUpdate, newStr, persons]
  );
  useEffect(() => handleInput(), [newStr, persons, handleInput]);
  return <input onChange={handleInput}></input>;
};
export default Filter;

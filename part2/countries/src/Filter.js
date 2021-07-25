const Filter = ({ handleToUpdate }) => {
  const handleInput = (evt) => {
    handleToUpdate(evt.target.value);
  };
  return <input onChange={handleInput}></input>;
};
export default Filter;

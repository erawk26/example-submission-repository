import React from "react";
import TelephoneInput from './TelephoneInput'
const Form = ({ handleToSubmit, handleToUpdate, telephoneValue}) => (
  <form onSubmit={handleToSubmit}>
    <div>
      name: <input id="name" />
    </div>
    <div>
      number: <TelephoneInput value={telephoneValue} handleToUpdate={handleToUpdate} id="number"/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
export default Form;

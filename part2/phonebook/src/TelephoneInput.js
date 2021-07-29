function formatPhoneNumber(value) {
  // clean the input for any non-digit values.
  value = value.replace(/[^\d]/g, "");
  const sliceStr = "          " + value.slice(-12);
  const a = sliceStr.slice(-4);
  const b = sliceStr.slice(-7, -4);
  const c = sliceStr.slice(-10, -7);
  const cc = sliceStr.slice(-12, -10).replace(/[\s]/g, "");
  const mainPart = `(${c})${b}-${a}`;
  const countryCode = `+${cc}`;
  const len = value.length;
  return len > 10 ? countryCode + mainPart : len === 10 ? mainPart : value;
}
export default function TelephoneInput({ id, value, handleToUpdate }) {
  //   const [value, setValue] = useState("");
  const handleChange = (evt) => {
    const formattedVal = formatPhoneNumber(evt.target.value);
    if (evt.target.value.length <= 16) {
      handleToUpdate(formattedVal);
    }
  };
  return (
    <input
      placeholder="+1(978)654-3210"
      value={value}
      id={id}
      onChange={handleChange}
    />
  );
}

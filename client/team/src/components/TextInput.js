const TextInput = ({ value, label, onChange, error }) => {
  return (
    <label className="a-input__label" htmlFor="code">
      {label}
      <input
        className={`a-input ${error ? 'a-input--error' : ''}`}
        type="text"
        name="code"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default TextInput;

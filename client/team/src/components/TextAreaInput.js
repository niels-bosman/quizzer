const TextAreaInput = ({ value, label, onChange }) => {

  return (

    <label className="a-input__label" htmlFor="code">
      {label}
      <textarea className="a-input a-input--textarea" rows={4} name="code" value={value} onChange={onChange} />
    </label>

  );
};

export default TextAreaInput;

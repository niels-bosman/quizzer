const Input = ({ children, error, ...props }) => (
  <label className="a-input__label">
    {children}
    <input
      className={`a-input ${error ? 'a-input--error' : ''}`}
      type="password"
      name="master-code"
      {...props} />
  </label>
);

export default Input;
const ButtonSecondary = ({ children, ...rest }) => (
  <button {...rest} className="a-button a-button--secondary">
    {children}
  </button>
);

export default ButtonSecondary;
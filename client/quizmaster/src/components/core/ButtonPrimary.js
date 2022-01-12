const ButtonPrimary = ({ children, classes, ...rest }) => (
  <button {...rest} className={`a-button a-button--primary ${classes}`}>
    {children}
  </button>
);

export default ButtonPrimary;
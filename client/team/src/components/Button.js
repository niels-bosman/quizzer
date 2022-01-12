const Button = ({ children, ...props }) => {
  return (
    <button
      className="a-button a-button--primary mr-4"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

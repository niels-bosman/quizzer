import Logo from '../Logo';

const Wait = ({ title, children }) => (
  <>
    <Logo />
    <h3>{title}</h3>
    {!!children && children}
  </>
);

export default Wait;

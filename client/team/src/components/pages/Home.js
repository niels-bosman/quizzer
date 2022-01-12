import Logo from '../Logo';
import LoginForm from '../LoginForm';

const Home = () => {
  return (
    <>
      <Logo />
      <h3 className="mb-10">Vul de quiz-code en teamnaam in om mee te doen met de Quiz!</h3>
      <LoginForm />
    </>
  );
};

export default Home;

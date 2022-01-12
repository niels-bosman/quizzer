import { useHistory } from 'react-router';
import Button from '../Button';
import Wait from './Wait';

const AwaitQuestion = () => {
  const history     = useHistory();
  const handleClick = () => history.push('/question');

  return (
    <Wait title="Antwoord succesvol ingediend. De Quizmaster is de antwoorden aan het controleren...">
      <Button onClick={handleClick}>
        Antwoord aanpassen
      </Button>
    </Wait>
  );
};

export default AwaitQuestion;
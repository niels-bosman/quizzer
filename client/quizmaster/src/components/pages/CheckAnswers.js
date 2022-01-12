import { useSelector } from 'react-redux';
import AnswerList from '../core/answer/AnswerList';
import ButtonPrimary from '../core/ButtonPrimary';
import { useHistory } from 'react-router';
import SubTitle from '../core/SubTitle';
import RightAnswer from '../core/answer/RightAnswer';
import axios from 'axios';
import { BASE_URL } from '../../api';

const CheckAnswers = () => {
  const history      = useHistory();
  const lobbyId      = useSelector(({ quiz }) => quiz.lobbyId);
  const question     = useSelector(({ question }) => question.current);
  const answer       = useSelector(({ question }) => question.currentAnswer);
  const answerAmount = useSelector(({ question }) => question.answers).length;
  const open         = useSelector(({ question }) => question.open);

  const handleCloseQuestion = async () => await axios.post(`${BASE_URL}/lobbies/${lobbyId}/questions/close`);
  const handleNextQuestion  = () => history.push('/question');

  return (
    <>
      <SubTitle className="mb-0">Antwoorden controleren</SubTitle>
      <RightAnswer className="my-5" question={question} answer={answer} />
      <AnswerList />
      <ButtonPrimary
        disabled={!open || answerAmount === 0}
        classes="mr-4"
        onClick={handleCloseQuestion}
      >
        Vraag sluiten
      </ButtonPrimary>
      <ButtonPrimary
        disabled={open}
        onClick={handleNextQuestion}
      >
        Volgende vraag stellen
      </ButtonPrimary>
    </>
  );
};

export default CheckAnswers;
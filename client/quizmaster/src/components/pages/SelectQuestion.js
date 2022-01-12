import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ButtonPrimary from '../core/ButtonPrimary';
import QuestionList from '../core/question/QuestionList';
import QuestionRefreshButton from '../core/question/QuestionRefreshButton';
import SubTitle from '../core/SubTitle';
import axios from 'axios';
import { BASE_URL } from '../../api';

const SelectQuestion = () => {
  const lobbyId          = useSelector(({ quiz }) => quiz.lobbyId);
  const history          = useHistory();
  const selectedQuestion = useSelector(({ question }) => question.current);

  const askQuestion = async () => {
    await axios.post(`${BASE_URL}/lobbies/${lobbyId}/questions`, { question: selectedQuestion });
    history.push('/answers');
  };

  return (
    <>
      <SubTitle className="mt-10 mb-0">Stel een vraag aan de deelnemers</SubTitle>
      <QuestionRefreshButton />
      <QuestionList />
      <ButtonPrimary onClick={askQuestion} disabled={selectedQuestion === ''}>
        Vraag selecteren
      </ButtonPrimary>
    </>
  );
};

export default SelectQuestion;
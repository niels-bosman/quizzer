import SubTitle from '../SubTitle';
import Title from '../Title';
import { useEffect } from 'react';
import { fetchCurrentQuestion, fetchGivenAnswers } from '../../reducers/question';
import { fetchCorrectAnswers } from '../../reducers/quiz';
import { useDispatch, useSelector } from 'react-redux';
import InfoLabel from '../InfoLabel';
import AnswerTable from '../AnswerTable';

const Answer = () => {
  const dispatch                       = useDispatch();
  const lobbyId                        = useSelector(({ quiz }) => quiz.lobbyId);
  const { question, answer, category } = useSelector(({ question }) => question.current);

  useEffect(() => {
    dispatch(fetchCurrentQuestion());
    dispatch(fetchGivenAnswers());
    dispatch(fetchCorrectAnswers());
  }, [dispatch, lobbyId]);

  return (
    <>
      <InfoLabel>{category}</InfoLabel>

      <div className="text-center my-6">
        <SubTitle>{question}</SubTitle>
        <Title>Antwoord: {answer}</Title>

        <div className="flex justify-content-center">
          <AnswerTable />
        </div>

      </div>
    </>
  );
};

export default Answer;
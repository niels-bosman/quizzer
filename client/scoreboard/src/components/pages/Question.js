import InfoLabel from '../InfoLabel';
import SubTitle from '../SubTitle';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentQuestion, fetchGivenAnswers } from '../../reducers/question';
import QuestionTable from '../QuestionTable';

const Question = () => {
  const dispatch               = useDispatch();
  const lobbyId                = useSelector(({ quiz }) => quiz.lobbyId);
  const { question, category } = useSelector(({ question }) => question.current);

  useEffect(() => {
    dispatch(fetchCurrentQuestion({ lobbyId }));
    dispatch(fetchGivenAnswers());
  }, [dispatch, lobbyId]);

  return (
    <>
      <InfoLabel>{category}</InfoLabel>
      <div className="text-center my-6">
        <SubTitle>{question}</SubTitle>
        <div className="flex justify-content-center">
          <QuestionTable />
        </div>
      </div>
    </>
  );
};

export default Question;
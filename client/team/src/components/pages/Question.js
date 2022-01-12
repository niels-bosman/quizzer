import { useEffect } from 'react';
import { getQuestion, setAnswer, submitAnswer } from '../../reducers/quiz';
import { useDispatch, useSelector } from 'react-redux';
import InfoLabel from '../InfoLabel';
import TextAreaInput from '../TextAreaInput';
import SubTitle from '../SubTitle';
import Button from '../Button';
import { useHistory } from 'react-router-dom';

const Question = () => {
  const dispatch               = useDispatch();
  const { question, category } = useSelector(({ quiz }) => quiz.question);
  const givenAnswer            = useSelector(({ quiz }) => quiz.givenAnswer);
  const lobbyId                = useSelector(({ quiz }) => quiz.lobbyId);
  const teamName               = useSelector(({ quiz }) => quiz.teamName);
  const history                = useHistory();

  useEffect(() => {
    dispatch(getQuestion({ lobbyId }));
  }, [dispatch, lobbyId]);

  const submit = async () => {
    const { payload } = await dispatch(submitAnswer({ lobbyId, teamName, givenAnswer }));

    switch (payload.status) {
      case 400:
        break;
      case 403:
        break;
      default:
        history.push('/question/answered');
    }
  };

  const changeAnswer = e => dispatch(setAnswer(e.target.value));

  const disabled = givenAnswer === '';

  return (
    <>
      <InfoLabel>{category}</InfoLabel>
      <div>
        <SubTitle className="pt-10 pb-4">{question}</SubTitle>
        <TextAreaInput value={givenAnswer} onChange={changeAnswer} />
        <Button onClick={submit} disabled={disabled}>Insturen</Button>
      </div>
    </>
  );
};

export default Question;

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAnswer, setCurrentQuestion } from '../../../reducers/question';

const QuestionListItem = ({ question, answer }) => {
  const dispatch         = useDispatch();
  const selectedQuestion = useSelector(({ question }) => question.current);
  const selected         = selectedQuestion === question;

  const classes = {
    checked: 'm-question-list__checkbox--checked',
  };

  const selectQuestion = () => {
    dispatch(setCurrentQuestion(question));
    dispatch(setCurrentAnswer(answer));
  };

  return (
    <div className="m-question-list__item" onClick={selectQuestion}>
      <button className={`m-question-list__checkbox ${selected ? classes.checked : ''}`} />
      <p className="m-question-list__question">{question}</p>
    </div>
  );
};

export default QuestionListItem;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../../reducers/question';
import QuestionListItem from './QuestionListItem';

const QuestionList = () => {
  const dispatch  = useDispatch();
  const questions = useSelector(({ question }) => question.all);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <section className="m-question-list">
      {questions.length === 0 && <p>Er zijn geen vragen gevonden voor de gekozen categorieën en taal.</p>}
      {questions.map(({ _id, question, answer }) => (
        <QuestionListItem key={_id} question={question} answer={answer} />
      ))}
    </section>
  );
};

export default QuestionList;
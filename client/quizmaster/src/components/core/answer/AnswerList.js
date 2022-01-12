import { useSelector } from 'react-redux';
import AnswerListItem from './AnswerListItem';

const AnswerList = () => {
  const answers = useSelector(({ question }) => question.answers);

  return (
    <section className="m-answer-list mb-10">
      {answers.length === 0 && <p>Er zijn nog geen antwoorden ingediend.</p>}
      {answers.map(({ team, answer, correct }) => (
        <AnswerListItem key={team._id} team={team} correct={correct}>{answer}</AnswerListItem>)
      )}
    </section>
  );
};

export default AnswerList;
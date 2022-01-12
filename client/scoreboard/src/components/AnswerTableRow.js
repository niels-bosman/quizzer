import { useSelector } from 'react-redux';

const AnswerTable = ({ answer }) => {
  const roundScore     = useSelector(({ quiz }) => quiz.roundScore);
  const correctAnswers = roundScore?.find(({ _id }) => _id === answer.team._id)?.score ?? 0;

  return (
    <tr>
      <td>{answer.team._id}</td>
      <td>{answer.answer}</td>
      <td>{answer.correct ? 'Ja' : 'Nee'}</td>
      <td>{correctAnswers}</td>
    </tr>
  );

};

export default AnswerTable;

import { useSelector } from 'react-redux';
import AnswerTableRow from './AnswerTableRow';

const AnswerTable = () => {
  const answers = useSelector(({ question }) => question.answers);

  return (
    <table className="a-table">
      <thead className="a-table__header">
      <tr>
        <th>Team naam</th>
        <th>Antwoord</th>
        <th>Goed?</th>
        <th>Vragen goed deze ronde</th>
      </tr>
      </thead>
      <tbody className="a-table__body">
        {answers.map(answer => <AnswerTableRow answer={answer} key={answer.team._id} />)}
      </tbody>
    </table>
  );

};

export default AnswerTable;

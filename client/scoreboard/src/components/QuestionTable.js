import { useSelector } from 'react-redux';
import QuestionTableRow from './QuestionTableRow';

const QuestionTable = () => {
  const answers = useSelector(({ question }) => question.answers);
  const teams   = useSelector(({ quiz }) => quiz.teams);

  const formatAnswers = () => {
    let answeredTable = [];

    for (const team of teams) {
      answeredTable.push({
        teamName: team._id,
        answered: answers.some(answer => answer.team._id === team._id) ? 'Ja' : 'Nee'
      });
    }

    return answeredTable;
  };

  return (
    <table className="a-table">
      <thead className="a-table__header">
      <tr>
        <th>Team naam</th>
        <th>Beantwoord?</th>
      </tr>
      </thead>
      <tbody className="a-table__body">
        {formatAnswers().map(answer => <QuestionTableRow answer={answer} key={answer.teamName} />)}
      </tbody>
    </table>
  );

};

export default QuestionTable;

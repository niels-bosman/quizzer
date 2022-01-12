const QuestionTableRow = ({ answer }) => (
  <tr>
    <td>{answer.teamName}</td>
    <td>{answer.answered}</td>
  </tr>
);

export default QuestionTableRow;

const RoundResultTableRow = ({ team }) => (
  <tr>
    <td>{team._id}</td>
    <td>{team.score}</td>
  </tr>
);

export default RoundResultTableRow;

import { useDispatch, useSelector } from 'react-redux';
import RoundResultTableRow from './RoundResultTableRow';
import { useEffect } from 'react';
import { fetchTeams } from '../reducers/quiz';
import axios from 'axios';

const RoundResultTable = () => {
  const dispatch = useDispatch();
  const teams    = useSelector(({ quiz }) => quiz.teams);
  const lobbyId  = useSelector(({ quiz }) => quiz.lobbyId);

  useEffect(() => {
    const calculateScores = async () => {
      await axios.post(`${process.env.REACT_APP_API_URI}/lobbies/${lobbyId}/score`);
      dispatch(fetchTeams());
    };
    calculateScores();
  }, [dispatch, lobbyId]);

  return (
    <table className="a-table">
      <thead className="a-table__header">
      <tr>
        <th>Team naam</th>
        <th>Totale score</th>
      </tr>
      </thead>
      <tbody className="a-table__body">
        {teams.map(team => <RoundResultTableRow team={team} key={team._id} />)}
      </tbody>
    </table>
  );

};

export default RoundResultTable;

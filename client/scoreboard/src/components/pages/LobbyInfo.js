import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchTeams, setLobbyId } from '../../reducers/quiz';
import { connect } from '../../socket';
import InfoLabel from '../InfoLabel';
import Title from '../Title';

const LobbyInfo = () => {
  const dispatch    = useDispatch();
  const teams       = useSelector(({ quiz }) => quiz.teams);
  const { lobbyId } = useParams();

  useEffect(() => {
    dispatch(setLobbyId(lobbyId));
    dispatch(fetchTeams());
    connect(lobbyId);
  }, [dispatch, lobbyId]);

  return (
    <>
      <InfoLabel>Doe mee</InfoLabel>
      <div className="text-center">
        <h2>Lobby</h2>
        <Title>Code: {lobbyId}</Title>
        <h2>Aantal teams: {teams.length}</h2>
      </div>
    </>
  );
};

export default LobbyInfo;
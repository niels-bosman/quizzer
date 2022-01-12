import { useSelector } from 'react-redux';
import LobbyListItem from './LobbyListItem';

const LobbyList = () => {
  const teams = useSelector(({ quiz }) => quiz.teams);

  return (
    <section className="m-lobby-list">
      {teams.length === 0 && <p>Er doen nog geen teams mee...</p>}
      {teams.map(({ _id }) => <LobbyListItem key={_id} name={_id} />)}
    </section>
  );
};

export default LobbyList;
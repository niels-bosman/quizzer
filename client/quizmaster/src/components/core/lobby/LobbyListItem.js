import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../../api';

const LobbyListItem = ({ name }) => {
  const lobbyId = useSelector(({ quiz }) => quiz.lobbyId);

  const handleRemove = async () => await axios.delete(`${BASE_URL}/lobbies/${lobbyId}/teams/${name}`);

  return (
    <li className="m-lobby-list__item">
      {name}
      <i
        className="m-lobby-list__remove-icon fas fa-times"
        onClick={handleRemove}
        title="Speler verwijderen"
      />
    </li>
  );
};

export default LobbyListItem;
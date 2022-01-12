import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ButtonPrimary from '../core/ButtonPrimary';
import SelectLanguage from '../core/category/SelectLanguage';
import LobbyList from '../core/lobby/LobbyList';
import SubTitle from '../core/SubTitle';
import axios from 'axios';
import { BASE_URL } from '../../api';

const Lobby = () => {
  const amount  = useSelector(({ quiz }) => quiz.teams).length;
  const lobbyId = useSelector(({ quiz }) => quiz.lobbyId);
  const history = useHistory();

  lobbyId === '' && history.push('/');

  const handleNextStep = async () => {
    await closeLobby();
    await addRound();
    history.push('/categories');
  };

  const closeLobby = async () => await axios.post(`${BASE_URL}/lobbies/${lobbyId}/close`);
  const addRound   = async () => await axios.post(`${BASE_URL}/lobbies/${lobbyId}/rounds`);

  return (
    <>
      <SelectLanguage />
      {
        amount !== 1
          ? <SubTitle>Er zitten momenteel {amount} spelers in lobby {lobbyId}.</SubTitle>
          : <SubTitle>Er zit momenteel {amount} speler in lobby {lobbyId}.</SubTitle>
      }
      <LobbyList />
      {amount <= 1 && <p>Om de quiz te starten moeten er minimaal twee personen meedoen.</p>}
      <ButtonPrimary onClick={handleNextStep} disabled={amount <= 1}>Categorieën selecteren</ButtonPrimary>
    </>
  );
};

export default Lobby;
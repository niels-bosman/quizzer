import ButtonSecondary from '../core/ButtonSecondary';
import ButtonPrimary from '../core/ButtonPrimary';
import { useHistory } from 'react-router';
import SubTitle from '../core/SubTitle';
import axios from 'axios';
import { BASE_URL } from '../../api';
import { useSelector } from 'react-redux';

const RoundFinished = () => {
  const history = useHistory();
  const lobbyId = useSelector(({ quiz }) => quiz.lobbyId);

  const handleStartNewRound = async () => {
    await addRound();
    history.push('/categories');
  };

  const handleStopQuiz = async () => await axios.post(`${BASE_URL}/lobbies/${lobbyId}/finish`);
  const addRound       = async () => await axios.post(`${BASE_URL}/lobbies/${lobbyId}/rounds`);

  return (
    <>
      <SubTitle className="mb-2">De ronde is voorbij</SubTitle>
      <p>Er zijn twaalf vragen gesteld in deze ronde, wil je een nieuwe ronde beginnen of is de Quiz voorbij?</p>
      <ButtonPrimary classes="mr-4 pt-10" onClick={handleStartNewRound}>Nog een ronde</ButtonPrimary>
      <ButtonSecondary onClick={handleStopQuiz}>Quiz stoppen</ButtonSecondary>
    </>
  );
};

export default RoundFinished;
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { joinGame, setLobbyId, setTeamName } from '../reducers/quiz';
import { connect } from '../socket';
import Button from './Button';
import TextInput from './TextInput';

const LoginForm = () => {
  const dispatch                  = useDispatch();
  const { teamName, lobbyId }     = useSelector(({ quiz }) => quiz);
  const history                   = useHistory();
  const [error, setError]         = useState('');
  const [codeValid, setCodeValid] = useState(true);
  const [teamValid, setTeamValid] = useState(true);

  const submit = async event => {
    event.preventDefault();

    const { payload } = await dispatch(joinGame({ lobbyId, teamName }));

    switch (payload.status) {
      case 400:
        setError('Er bestaat geen game met deze code.');
        setCodeValid(false);
        break;
      case 403:
        setError('Team naam is al gekozen, kies een andere.');
        setTeamValid(false);
        break;
      default:
        setTeamValid(true);
        setCodeValid(true);
        connect(lobbyId);
        history.push('/wait');
    }
  };

  const valid = lobbyId !== '' && teamName !== '';

  return (
    <form onSubmit={submit}>
      {error !== '' && <p className="error-message">{error}</p>}
      <TextInput
        error={!codeValid}
        label="Quiz-code"
        value={lobbyId}
        onChange={e => dispatch(setLobbyId(e.target.value))}
      />
      <TextInput
        error={!teamValid}
        label="Teamnaam"
        value={teamName}
        onChange={e => dispatch(setTeamName(e.target.value))}
      />
      <Button disabled={!valid} type="submit">Meedoen</Button>
    </form>
  );
};

export default LoginForm;

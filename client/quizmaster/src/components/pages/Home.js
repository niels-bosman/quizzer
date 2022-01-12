import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createLobby } from '../../reducers/quiz';
import { connect } from '../../socket';
import ButtonPrimary from '../core/ButtonPrimary';
import Input from '../core/Input';
import SubTitle from '../core/SubTitle';
import Title from '../core/Title';

const Home = () => {
  const dispatch                    = useDispatch();
  const history                     = useHistory();
  const [masterCode, setMasterCode] = useState('');
  const [error, setError]           = useState('');
  const [codeValid, setCodeValid]   = useState(true);

  const submit = async () => {
    const { payload } = await dispatch(createLobby(masterCode));

    switch (payload.status) {
      case 400:
        setError('Master code is niet correct.');
        setCodeValid(false);
        break;
      default:
        setCodeValid(true);
        connect(payload.data);
        window.open(`${process.env.REACT_APP_SCOREBOARD_URI}/lobby/${payload.data}`);
        history.push('/lobby');
    }
  };

  return (
    <>
      <Title>Quizzer</Title>

      <SubTitle>Start een quiz als Quiz master</SubTitle>
      {error !== '' && <p className="error-message">{error}</p>}
      <Input error={!codeValid} onChange={e => setMasterCode(e.target.value)}>Master code</Input>
      <ButtonPrimary onClick={submit}>Maak een lobby</ButtonPrimary>
    </>
  );
};

export default Home;
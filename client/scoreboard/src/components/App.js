import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { useHistory } from 'react-router-dom';
import { socket } from '../socket';
import Answer from './pages/Answer';
import LobbyInfo from './pages/LobbyInfo';
import Question from './pages/Question';
import Result from './pages/Result';
import Waiting from './pages/Waiting';
import RoundResult from './pages/RoundResult';

const App = () => {
  const dispatch = useDispatch();
  const state    = useSelector(state => state);
  const history  = useHistory();
  socket(dispatch, state, history);

  return (
    <div className="a-container a-container--gutter py-10">
      <Switch>
        <Route exact path="/lobby/:lobbyId">
          <LobbyInfo />
        </Route>
        <Route exact path="/waiting">
          <Waiting />
        </Route>
        <Route exact path="/question">
          <Question />
        </Route>
        <Route exact path="/answer">
          <Answer />
        </Route>
        <Route exact path="/result">
          <Result />
        </Route>
        <Route exact path="/round-finished">
          <RoundResult />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import { socket } from '../socket';
import CheckAnswers from './pages/CheckAnswers';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import SelectCategories from './pages/SelectCategories';
import SelectQuestion from './pages/SelectQuestion';
import RoundFinished from './pages/RoundFinished';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const lobbyId  = useSelector(({ quiz }) => quiz.lobbyId);
  const state    = useSelector(state => state);
  const history  = useHistory();
  socket(dispatch, state, history);

  useEffect(() => {
    if (lobbyId === '') {
      history.push('/');
    }
  }, [history, lobbyId]);

  return (
    <div className="a-container a-container--gutter py-10">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/lobby">
          <Lobby />
        </Route>
        <Route path="/categories">
          <SelectCategories />
        </Route>
        <Route path="/question">
          <SelectQuestion />
        </Route>
        <Route path="/answers">
          <CheckAnswers />
        </Route>
        <Route path="/round-finished">
          <RoundFinished />
        </Route>
      </Switch>
    </div>
  );
};


export default App;
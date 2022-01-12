import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { useHistory } from 'react-router-dom';
import { socket } from '../socket';
import Home from './pages/Home';
import Question from './pages/Question';
import Wait from './pages/Wait';
import AwaitQuestion from './pages/AwaitQuestion';
import QuestionClosed from './pages/QuestionClosed';
import RoundFinished from './pages/RoundFinished';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const state    = useSelector(state => state);
  const lobbyId  = useSelector(({ quiz }) => quiz.lobbyId);
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
          <Home/>
        </Route>
        <Route path="/wait">
          <Wait title="Aan het wachten tot de Quizmaster de quiz start..."/>
        </Route>
        <Route exact path="/question">
          <Question/>
        </Route>
        <Route exact path="/question/answered">
          <AwaitQuestion/>
        </Route>
        <Route exact path="/question/closed">
          <QuestionClosed/>
        </Route>
        <Route exact path="/round-finished">
          <RoundFinished/>
        </Route>
      </Switch>
    </div>
  );
};


export default App;

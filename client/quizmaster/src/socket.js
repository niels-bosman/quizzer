import { io } from 'socket.io-client';
import { fetchTeams, resetAllQuiz } from './reducers/quiz';
import { fetchAnswers, resetAllQuestion, resetGivenAnswers, setQuestionOpen } from './reducers/question';
import { resetAllCategory } from './reducers/category';

let ws;

const connect = lobby => ws.emit('MASTER_CONNECT', { lobby });

const disconnect = lobby => ws.emit('MASTER_DISCONNECT', { lobby });

const socket = (dispatch, state, history) => {
  if (ws === undefined) {
    ws = io('ws://localhost:3000', { reconnectionDelayMax: 10000, withCredentials: true });
  }

  ws.off('message').on('message', ({ type }) => {
    switch (type) {
      case 'TEAMS_CHANGED':
        dispatch(fetchTeams());
        break;
      case 'TEAM_REMOVED':
        dispatch(fetchTeams());
        break;
      case 'NEW_QUESTION':
        dispatch(resetGivenAnswers());
        dispatch(setQuestionOpen(true));
        break;
      case 'QUESTION_CLOSED':
        dispatch(setQuestionOpen(false));
        break;
      case 'ROUND_FINISHED':
        history.push('/round-finished');
        break;
      case 'LOBBY_FINISHED':
        dispatch(resetAllQuestion());
        dispatch(resetAllCategory());
        dispatch(resetAllQuiz());
        disconnect(state.quiz.lobbyId);
        history.push('/');
        break;
      case 'NEW_ANSWER':
        dispatch(fetchAnswers());
        break;
      default:
        console.log(type);
    }
  });
};

export { connect, socket };
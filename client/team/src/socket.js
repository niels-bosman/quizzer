import { io } from 'socket.io-client';
import { resetAll, resetGivenAnswer } from './reducers/quiz';

let ws;

const connect = lobby => ws.emit('TEAM_CONNECT', { lobby });

const disconnect = lobby => ws.emit('TEAM_DISCONNECT', { lobby });

const socket = (dispatch, state, history) => {
  if (ws === undefined) {
    ws = io('ws://localhost:3000', { reconnectionDelayMax: 10000, withCredentials: true });
  }

  ws.off('message').on('message', ({ type, payload }) => {
    switch (type) {
      case 'TEAM_REMOVED':
        if (payload.teamId === state.quiz.teamName) {
          disconnect(state.quiz.lobbyId);
          dispatch(resetAll());
          history.push('/');
        }
        break;
      case 'NEW_QUESTION':
        dispatch(resetGivenAnswer());
        history.push('/question');
        break;
      case 'QUESTION_CLOSED':
        history.push('/question/closed');
        break;
      case 'LOBBY_FINISHED':
        disconnect(state.quiz.lobbyId);
        dispatch(resetAll());
        history.push('/');
        break;
      case 'ROUND_FINISHED':
        history.push('/round-finished');
        break;
      default:
        console.log(type, payload ?? 'no payload');
    }
  });
};

export { connect, socket };
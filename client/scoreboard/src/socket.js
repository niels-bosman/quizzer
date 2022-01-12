import { io } from 'socket.io-client';
import { fetchCorrectAnswers, fetchResults, fetchTeams } from './reducers/quiz';
import { fetchGivenAnswers } from './reducers/question';

let ws;

const connect = lobby => ws.emit('SCOREBOARD_CONNECT', { lobby });

const disconnect = lobby => ws.emit('SCOREBOARD_DISCONNECT', { lobby });

const socket = (dispatch, state, history) => {
  if (ws === undefined) {
    ws = io('ws://localhost:3000', { reconnectionDelayMax: 10000, withCredentials: true });
  }

  ws.off('message').on('message', async ({ type }) => {
    switch (type) {
      case 'TEAMS_CHANGED':
        dispatch(fetchTeams());
        break;
      case 'TEAM_REMOVED':
        dispatch(fetchTeams());
        break;
      case 'NEW_QUESTION':
        history.push('/question');
        break;
      case 'NEW_ANSWER':
        dispatch(fetchGivenAnswers());
        dispatch(fetchCorrectAnswers());
        break;
      case 'QUESTION_CLOSED':
        history.push('/answer');
        break;
      case 'LOBBY_CLOSED':
        history.push('/waiting');
        break;
      case 'ROUND_FINISHED':
        history.push('/round-finished');
        break;
      case 'LOBBY_FINISHED':
        await dispatch(fetchResults());
        history.push('/result');
        disconnect(state.quiz.lobbyId);
        break;
      default:
        console.log(type);
    }
  });
};

export { connect, socket };
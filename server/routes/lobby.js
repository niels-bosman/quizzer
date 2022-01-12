import express from 'express';
import {
  addRound,
  addTeamToLobby,
  closeLobby,
  createLobby,
  finishLobby,
  getAllLobbies,
  setLanguage,
  getLobbyScore
} from '../controllers/lobby-controller.js';
import {
  addQuestionInLobby,
  answerQuestionInLobby,
  closeQuestion,
  getCorrectAnswersInCurrentRound,
  getCurrentRoundInLobby,
  getGivenAnswersInLobby,
  getPossibleQuestionsInLobby,
  getQuestionCountInLobby,
  getQuestionInLobby,
  markAnswerInLobby,
  saveScoreOfCurrentRound
} from '../controllers/question-controller.js';
import { deleteTeam, getAllTeams, getTeam, updateTeam } from '../controllers/team-controller.js';
import { Lobby } from '../models/lobby.js';
import {
  LOBBY_CLOSED,
  LOBBY_FINISHED,
  NEW_ANSWER,
  NEW_QUESTION,
  QUESTION_CLOSED,
  ROUND_FINISHED,
  TEAM_REMOVED,
  TEAMS_CHANGED
} from '../support/socket/messages.js';
import { setCategoriesInLobby } from '../controllers/category-controller.js';

const lobbyRouter = express.Router();

lobbyRouter.get('/', async (request, result) => {
  try {
    const lobbies = await getAllLobbies();
    return result.status(200).send(lobbies);
  } catch (error) {
    return result.status(400).json(error);
  }
});

lobbyRouter.post('/', async (request, result) => {
  try {
    const { _id } = await createLobby(request.body.language, request.body.masterCode);
    return result.status(201).send(_id);
  } catch (error) {
    return result.status(400).json(error);
  }
});

lobbyRouter.get('/:lobbyId/teams', async ({ params: { lobbyId } }, result) => {
  try {
    const lobby = await Lobby.findById(lobbyId);
    return result.status(200).json(lobby.teams);
  } catch (error) {
    return result.status(400).json(error);
  }
});

lobbyRouter.get('/:lobbyId/lobby-score', async ({ params: { lobbyId } }, result) => {
  try {
    const lobbyScore = await getLobbyScore(lobbyId);
    return result.status(203).json(lobbyScore);
  } catch (error) {
    return result.status(error).send();
  }
});

lobbyRouter.post('/:lobbyId/teams', async ({ body: { teamName }, params: { lobbyId }, io }, result) => {
  try {
    await addTeamToLobby(teamName, lobbyId);
    io.in(lobbyId).emit('message', { type: TEAMS_CHANGED });
    return result.status(203).send();
  } catch (error) {
    return result.status(error).send();
  }
});

lobbyRouter.post('/:lobbyId/close', async ({ params: { lobbyId }, io }, result) => {
  try {
    await closeLobby(lobbyId);
    io.in(lobbyId).emit('message', { type: LOBBY_CLOSED });
    return result.status(203).send();
  } catch (error) {
    return result.status(error).send();
  }
});

lobbyRouter.post('/:lobbyId/finish', async ({ params: { lobbyId }, io }, result) => {
  try {
    await finishLobby(lobbyId);
    await io.in(lobbyId).emit('message', { type: LOBBY_FINISHED });
    return result.status(203).send();
  } catch (error) {
    return result.status(error).send();
  }
});

lobbyRouter.post('/:lobbyId/language/:language', async ({ params: { lobbyId, language } }, result) => {
  try {
    await setLanguage(lobbyId, language);
    return result.status(203).send(language);
  } catch (error) {
    return result.status(error).send();
  }
});

lobbyRouter.post('/:lobbyId/categories', async ({ params: { lobbyId }, body: { categories } }, result) => {
  try {
    await setCategoriesInLobby(lobbyId, categories);
    return result.status(203).send();
  } catch (error) {
    return result.status(error).send();
  }
});

lobbyRouter.get('/:lobbyId/questions', async ({ params: { lobbyId }, io }, result) => {
  try {
    if (await getQuestionCountInLobby(lobbyId) === 12) {
      io.in(lobbyId).emit('message', { type: ROUND_FINISHED });
      return result.status(304).send();
    } else {
      const questions = await getPossibleQuestionsInLobby(lobbyId);
      return result.status(203).send(questions);
    }
  } catch (error) {
    return result.status(500).send(error);
  }
});

lobbyRouter.post('/:lobbyId/questions/close', async ({ params: { lobbyId }, io }, result) => {
  try {
    await closeQuestion(lobbyId);
    io.in(lobbyId).emit('message', { type: QUESTION_CLOSED });
    return result.status(200).send();
  } catch (error) {
    return result.status(error).send();
  }
});

lobbyRouter.get('/:lobbyId/questions/count', async ({ params: { lobbyId } }, result) => {
  try {
    const questionCount = await getQuestionCountInLobby(lobbyId);
    return result.status(200).send(questionCount);
  } catch (error) {
    return result.status(error).send();
  }
});

lobbyRouter.get('/:lobbyId/rounds/current', async ({ params: { lobbyId } }, result) => {
  try {
    const currentRound = await getCurrentRoundInLobby(lobbyId);
    return result.status(200).send(currentRound);
  } catch (error) {
    return result.status(500).send(error);
  }
});

lobbyRouter.post('/:lobbyId/questions', async ({ params: { lobbyId }, body: { question }, io }, result) => {
  try {
    await addQuestionInLobby(lobbyId, question);
    io.in(lobbyId).emit('message', { type: NEW_QUESTION });
    return result.status(203).send();
  } catch (error) {
    return result.status(500).send(error);
  }
});

lobbyRouter.get('/:lobbyId/teams', async ({ params: { lobbyId } }, result) => {
  try {
    const teams = await getAllTeams(lobbyId);
    return result.status(200).json(teams);
  } catch (error) {
    return result.status(500).send(error);
  }
});

lobbyRouter.get('/:lobbyId/question', async ({ params: { lobbyId } }, result) => {
  try {
    const question = await getQuestionInLobby(lobbyId);
    return result.status(200).json(question);
  } catch (error) {
    result.status(500).send(error);
  }
});

lobbyRouter.get('/:lobbyId/answers', async ({ params: { lobbyId } }, result) => {
  try {
    const question = await getGivenAnswersInLobby(lobbyId);
    return result.status(200).json(question);
  } catch (error) {
    result.status(500).send(error);
  }
});

lobbyRouter.get('/:lobbyId/round-score', async ({ params: { lobbyId } }, result) => {
  try {
    const score = await getCorrectAnswersInCurrentRound(lobbyId);
    return result.status(200).json(score);
  } catch (error) {
    result.status(500).send(error);
  }
});

lobbyRouter.post('/:lobbyId/score', async ({ params: { lobbyId } }, result) => {
  try {
    const score = await saveScoreOfCurrentRound(lobbyId);
    return result.status(200).json(score);
  } catch (error) {
    result.status(500).send(error);
  }
});

lobbyRouter.post('/:lobbyId/answers', async ({ params: { lobbyId }, body: { teamName, givenAnswer }, io }, result) => {
  try {
    const question = await answerQuestionInLobby(lobbyId, teamName, givenAnswer);
    io.in(lobbyId).emit('message', { type: NEW_ANSWER });
    return result.status(200).json(question);
  } catch (error) {
    result.status(500).send(error);
  }
});

lobbyRouter.put('/:lobbyId/answers', async ({ params: { lobbyId }, body: { teamId, correct }, io }, result) => {
  try {
    await markAnswerInLobby(lobbyId, teamId, correct);
    io.in(lobbyId).emit('message', { type: NEW_ANSWER });
    return result.status(200).json();
  } catch (error) {
    result.status(500).send(error);
  }
});

lobbyRouter.get('/:lobbyId/teams/:teamId', async ({ params: { lobbyId, teamId } }, result) => {
  try {
    const team = await getTeam(lobbyId, teamId);
    return result.status(200).json(team);
  } catch (error) {
    result.status(500).send(error);
  }
});

lobbyRouter.put('/:lobbyId/teams/:teamId', async ({ params: { lobbyId, teamId }, query, io }, result) => {
  try {
    const team = await updateTeam(lobbyId, teamId, query);
    io.in(lobbyId).emit('message', { type: TEAMS_CHANGED });
    return result.status(200).json(team);
  } catch (error) {
    result.status(500).send(error);
  }
});

lobbyRouter.delete('/:lobbyId/teams/:teamId', async ({ params: { lobbyId, teamId }, io }, result) => {
  try {
    await deleteTeam(lobbyId, teamId);
    io.in(lobbyId).emit('message', { type: TEAM_REMOVED, payload: { teamId } });
    return result.status(204).send();
  } catch (error) {
    result.status(500).send(error);
  }
});

lobbyRouter.post('/:lobbyId/rounds', async ({ params: { lobbyId } }, result) => {
  try {
    await addRound(lobbyId);
    return result.status(204).send();
  } catch (error) {
    result.status(500).send(error);
  }
});

export { lobbyRouter };
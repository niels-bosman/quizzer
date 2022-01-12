import { Lobby } from '../models/lobby.js';
import { generateRoomCode } from '../support/socket/utils.js';

/**
 * Returns all lobbies that exist.
 *
 * @return {Promise<void>}
 */
const getAllLobbies = async () => {
  return Lobby.find();
};

/**
 * Creates a lobby based on given language.
 *
 * @param language
 * @return {Promise<void>}
 */
const createLobby = async (language, masterCode) => {

  if (masterCode !== 'quizzer') {
    throw 'Master code is niet correct.';
  }

  const generateCode = async () => {
    const code = generateRoomCode();

    // Call this function until the code is not yet used.
    return await Lobby.findById(code) === null ? code : generateCode();
  };

  return Lobby.create({
    _id:    await generateCode(),
    language,
    rounds: [],
    teams:  [],
  });
};

/**
 * Adds a team to a specific lobby.
 *
 * @param teamName
 * @param lobbyId
 * @return {Promise<void>}
 */
const addTeamToLobby = async (teamName, lobbyId) => {
  const lobby = await Lobby.findById(lobbyId);

  if (!lobby || !lobby.open) {
    throw 400;
  }

  for (const { _id } of lobby.teams) {
    if (_id === teamName) {
      throw 403;
    }
  }

  try {
    await lobby.updateOne({ $push: { teams: { _id: teamName, score: 0 } } });
  } catch (error) {
    throw 400;
  }
};

/**
 * Adds an empty round to a lobby based on lobby ID.
 *
 * @param lobbyId
 * @return {Promise<void>}
 */
const addRound = async lobbyId => {
  await Lobby.findOneAndUpdate(
    { _id: lobbyId },
    { $push: { rounds: {} } }
  );
};

/**
 * Closes a lobby based on lobby ID.
 *
 * @param lobbyId
 * @return {Promise<>}
 */
const closeLobby = async lobbyId => {
  return Lobby.updateOne({ _id: lobbyId }, { open: false });
};

/**
 * Mark the lobby as finished based on Lobby ID.
 *
 * @param lobbyId
 * @return {Promise<{}>}
 */
const finishLobby = async lobbyId => {
  return Lobby.updateOne({ _id: lobbyId }, { finished: true });
};

/**
 * Get the score for the complete lobby with all round points and correctly answered questions.
 *
 * @param lobbyId
 * @return {Promise<*[]>}
 */
const getLobbyScore = async lobbyId => {
  const lobby = await Lobby.findById(lobbyId);
  const teams = [];

  for (const team of lobby.teams) {
    teams.push({ _id: team._id, score: team.score, correctAnswers: 0 });
  }

  for (const round of lobby.rounds) {
    for (const question of round.questions) {
      for (const givenAnswer of question.givenAnswers) {
        for (const team of teams) {
          if (givenAnswer.team._id === team._id && givenAnswer.correct) {
            team.correctAnswers++;
          }
        }
      }
    }
  }

  return teams;
};

/**
 * Set the language of the lobby based on lobby ID and language argument.
 *
 * @param lobbyId
 * @param language
 * @return {Promise<{}>}
 */
const setLanguage = async (lobbyId, language) => {
  return Lobby.updateOne({ _id: lobbyId }, { language });
};

export { getAllLobbies, createLobby, addTeamToLobby, addRound, closeLobby, finishLobby, setLanguage, getLobbyScore };

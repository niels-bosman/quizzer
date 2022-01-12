import { Lobby } from '../models/lobby.js';
import { Question } from '../models/question.js';

/**
 * Fetch all questions for a given category.
 *
 * @param category
 * @return {Promise<{}>}
 */
const getQuestionsForCategory = async category => {
  return Question.find({ category });
};

/**
 * Adds a question to a lobby.
 *
 * @param lobbyId
 * @param question
 * @return {Promise<void>}
 */
const addQuestionInLobby = async (lobbyId, question) => {
  const [lobby, foundQuestion] = await Promise.all([
    Lobby.findById(lobbyId),
    Question.findOne({ question }),
  ]);

  if (foundQuestion === null) throw new Error();

  lobby.addQuestion(foundQuestion);
  lobby.save();
};

/**
 * Fetches the current question based on given lobby ID.
 *
 * @param lobbyId
 * @return {Promise<>}
 */
const getQuestionInLobby = async lobbyId => {
  const lobby = await Lobby.findById(lobbyId);

  return lobby.rounds[lobby.rounds.length - 1]?.currentQuestion;
};

/**
 * Fetches the given answers for the current question based on a lobby ID.
 *
 * @param lobbyId
 * @return {Promise<>}
 */
const getGivenAnswersInLobby = async lobbyId => {
  const lobby           = await Lobby.findById(lobbyId);
  const currentQuestion = lobby.getCurrentQuestion();
  return currentQuestion.givenAnswers;
};

/**
 * Fetches the given answers for the current question based on a lobby ID.
 *
 * @param lobbyId
 * @return {Promise<>}
 */
const getCorrectAnswersInCurrentRound = async lobbyId => {
  const lobby        = await Lobby.findById(lobbyId);
  const currentRound = lobby.getCurrentRound();

  const teams = [];

  for (const team of lobby.teams) {
    teams.push({ _id: team._id, score: 0 });
  }

  for (const question of currentRound.questions) {
    for (const givenAnswer of question.givenAnswers) {
      for (const team of teams) {
        if (givenAnswer.team._id === team._id && givenAnswer.correct) {
          team.score++;
        }
      }
    }
  }

  return teams;
};

/**
 * Save the score of the current round for all teams in a specific lobby.
 *
 * @param lobbyId
 * @return {Promise<>}
 */
const saveScoreOfCurrentRound = async lobbyId => {
  const lobby    = await Lobby.findById(lobbyId);
  let teamScores = await getCorrectAnswersInCurrentRound(lobbyId);
  const teams    = lobby.teams;

  teamScores.sort((a, b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));

  teamScores.forEach((team, index) => {
    switch (index) {
      case 0:
        teams[index].score += 4;
        break;
      case 1:
        teams[index].score += 2;
        break;
      case 2:
        teams[index].score += 1;
        break;
      default:
        teams[index].score += 0.1;
    }
  });

  lobby.save();
};

/**
 * Submit the current question based on given lobby ID.
 *
 * @param lobbyId
 * @param teamId
 * @param answer
 * @return {Promise<>}
 */
const answerQuestionInLobby = async (lobbyId, teamId, answer) => {
  const lobby        = await Lobby.findById(lobbyId);
  const currentRound = lobby.getCurrentRound();
  const correct      = answer.toLowerCase() === currentRound.currentQuestion.answer.toLowerCase() || null;
  let team           = {};

  for (const teamInLobby of lobby.teams) {
    if (teamInLobby._id === teamId) {
      team = teamInLobby;
    }
  }

  for (const { question, givenAnswers, open } of currentRound.questions ?? []) {
    if (!open || question.question !== currentRound.currentQuestion.question) continue;

    for (const givenAnswer of givenAnswers) {
      if (givenAnswer.team._id !== team._id) continue;

      givenAnswer.answer  = answer;
      givenAnswer.correct = correct;
      lobby.save();
      return;
    }

    givenAnswers.push({ team, answer, correct });
    lobby.save();
    return;
  }
};

/**
 * Marks a question in a lobby as correct or incorrect.
 *
 * @param lobbyId
 * @param teamId
 * @param correct
 * @return {Promise<void>}
 */
const markAnswerInLobby = async (lobbyId, teamId, correct) => {
  const lobby    = await Lobby.findById(lobbyId);
  const answers  = lobby.getCurrentQuestion().givenAnswers;
  const answer   = answers.find(({ team }) => team._id === teamId);
  answer.correct = correct;

  lobby.save();
};

/**
 * Retrieves a randomized list of questions that are
 * not yet asked and in the category list.
 *
 * @param lobbyId
 * @return {Promise<{}>}
 */
const getPossibleQuestionsInLobby = async lobbyId => {
  const { rounds, language } = await Lobby.findById(lobbyId);
  const { categories }       = rounds[rounds.length - 1];
  let questionsAsked         = [];

  rounds.forEach(({ questions }) => questions.forEach(({ question: { question } }) => questionsAsked.push(question)));

  const questions = await Question.find({
    language,
    category: { $in: categories },
    question: { $nin: questionsAsked },
  });

  return questions.sort(() => Math.random() - 0.5).slice(0, 5);
};

/**
 * Closes the current question based on lobby ID.
 *
 * @param lobbyId
 * @return {Promise<void>}
 */
const closeQuestion = async lobbyId => {
  const lobby                     = await Lobby.findById(lobbyId);
  lobby.getCurrentQuestion().open = false;

  await lobby.save();
};

/**
 * Get the current round for a given lobbyId.
 *
 * @param lobbyId
 * @return {Promise<{}>}
 */
const getCurrentRoundInLobby = async (lobbyId) => {
  const lobby = await Lobby.findById(lobbyId);
  return lobby.getCurrentRound();
};

/**
 * Get the number of questions asked for a given lobbyId.
 *
 * @param lobbyId
 * @return {Promise<{}>}
 */
const getQuestionCountInLobby = async (lobbyId) => {
  const lobby = await Lobby.findById(lobbyId);
  return lobby.getQuestionCount();
};

export {
  getQuestionsForCategory,
  getQuestionInLobby,
  getCorrectAnswersInCurrentRound,
  getPossibleQuestionsInLobby,
  answerQuestionInLobby,
  addQuestionInLobby,
  getQuestionCountInLobby,
  getCurrentRoundInLobby,
  getGivenAnswersInLobby,
  markAnswerInLobby,
  closeQuestion,
  saveScoreOfCurrentRound
};
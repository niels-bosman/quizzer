import { Lobby } from '../models/lobby.js';
import { Question } from '../models/question.js';

/**
 * Fetch all unique categories for a given language.
 *
 * @param language
 * @return {Promise<{}>}
 */
const getCategories = async language => {
  return Question.find({ language }).distinct('category');
};

/**
 * Set the categories in the given lobby (for the latest round).
 *
 * @param lobbyId
 * @param categories
 * @return {Promise<void>}
 */
const setCategoriesInLobby = async (lobbyId, categories) => {
  const lobby = await Lobby.findById(lobbyId);
  lobby.rounds[lobby.rounds.length - 1].categories = categories ?? [];
  lobby.save();
};

export { getCategories, setCategoriesInLobby };
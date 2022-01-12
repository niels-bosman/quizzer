import { Lobby } from '../models/lobby.js';

/**
 * Fetches all of the teams in a specific lobby.
 *
 * @param lobbyId
 * @return {Promise<{}>}
 */
const getAllTeams = async lobbyId => {
  const lobby = await Lobby.findById(lobbyId);

  return lobby.teams;
};

/**
 * Retrieve a team based on given arguments.
 *
 * @param lobbyId
 * @param teamId
 * @return {Promise<{}>}
 */
const getTeam = async (lobbyId, teamId) => {
  const lobby = await Lobby.findById(lobbyId, {
    teams: { $elemMatch: { _id: teamId } }
  });

  return lobby.teams[0] ?? {};
};

/**
 * Update a team based on given arguments.
 *
 * @param lobbyId
 * @param teamId
 * @param _id
 * @param score
 * @return {Promise<{}>}
 */
const updateTeam = async (lobbyId, teamId, { _id, score }) => {
  return Lobby.updateOne(
    { _id: lobbyId, 'teams._id': teamId },
    {
      $set: {
        'teams.$._id':   _id,
        'teams.$.score': score,
      }
    },
  );
};

/**
 * Remove a team from a lobby based on given arguments.
 *
 * @param lobbyId
 * @param teamId
 * @return {Promise<void>}
 */
const deleteTeam = async (lobbyId, teamId) => {
  return Lobby.updateOne(
    { _id: lobbyId },
    { $pull: { teams: { _id: teamId } } }
  );
};

export { getAllTeams, getTeam, updateTeam, deleteTeam };
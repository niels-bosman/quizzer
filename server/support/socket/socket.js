import { TEAMS_CHANGED } from './messages.js';

export const handleTeamConnect = (socket, { lobby }, io) => {
  socket.join(lobby);
  io.in(lobby).emit({ type: TEAMS_CHANGED });
};

export const handleDisconnect = (socket, { lobby }) => {
  socket.leave(lobby);
};

export const handleConnect = (socket, { lobby }) => {
  socket.join(lobby);
};
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { categoryRouter } from './routes/category.js';
import { lobbyRouter } from './routes/lobby.js';

import {
  MASTER_CONNECT,
  MASTER_DISCONNECT,
  SCOREBOARD_CONNECT,
  SCOREBOARD_DISCONNECT,
  TEAM_CONNECT,
  TEAM_DISCONNECT
} from './support/socket/messages.js';

import { handleConnect, handleDisconnect, handleTeamConnect, } from './support/socket/socket.js';

// Setup .env support
dotenv.config();
const { DB_HOST, DB_PORT, DB_COLLECTION, PORT } = process.env;

// Set settings
const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_COLLECTION}`;
const origin = ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'];

// Start servers
const app    = express();
const server = createServer(app);
const io     = new Server(server, { cors: { origin, credentials: true } });

// Start database
mongoose.connect(DB_URI);
mongoose.connection.once('open', () => console.log('MongoDB database connection established successfully'));

// Use express extensions
app.use(session({ resave: true, secret: 'quizzer', saveUninitialized: true }));
app.use(cors({ origin, optionsSuccessStatus: 200, }));
app.use(express.json());

app.use('/', async (request, _, next) => {
  request.io = io;
  next();
});

// Setup routes
app.use('/lobbies', lobbyRouter);
app.use('/categories', categoryRouter);

// Setup socket event handlers
io.on('connection', socket => {
  socket.on(TEAM_CONNECT, data => handleTeamConnect(socket, data, io));
  socket.on(TEAM_DISCONNECT, data => handleDisconnect(socket, data));
  socket.on(MASTER_CONNECT, data => handleConnect(socket, data));
  socket.on(MASTER_DISCONNECT, data => handleDisconnect(socket, data));
  socket.on(SCOREBOARD_CONNECT, data => handleConnect(socket, data));
  socket.on(SCOREBOARD_DISCONNECT, data => handleDisconnect(socket, data));
});

// Start the Node server
server.listen(PORT, () => console.info(`Server is running on port: ${PORT}`));
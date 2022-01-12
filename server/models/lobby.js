import mongoose from 'mongoose';
import { roundSchema } from './round.js';
import { teamSchema } from './team.js';

const lobbySchema = new mongoose.Schema({
  _id:      { type: String, required: true },
  language: { type: String, required: true },
  rounds:   [roundSchema],
  teams:    [teamSchema],
  open:     { type: Boolean, default: true },
  finished: { type: Boolean, default: false },
});

lobbySchema.methods.getCurrentRound = function () {
  return this.rounds[this.rounds.length - 1];
};

lobbySchema.methods.getCurrentQuestion = function () {
  const currentRound = this.getCurrentRound();
  return currentRound.questions[currentRound.questions.length - 1];
};

lobbySchema.methods.getQuestionCount = function () {
  const currentRound = this.getCurrentRound();
  return currentRound.questions.length;
};

lobbySchema.methods.addQuestion = function (question) {
  const currentRound = this.getCurrentRound();
  currentRound.questions.push({ question, givenAnswers: [], });
  currentRound.currentQuestion = question;
};

const Lobby = mongoose.model('Lobby', lobbySchema);

export { Lobby, lobbySchema };
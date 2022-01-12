import mongoose from 'mongoose';
import { questionSchema } from './question.js';
import { teamSchema } from './team.js';

const roundSchema = new mongoose.Schema({
  categories:      [String],
  questions:       [{
    question:     questionSchema,
    givenAnswers: [{
      team:    teamSchema,
      answer:  { type: String, required: true },
      correct: { type: Boolean, default: null },
    }],
    open:         { type: Boolean, default: true },
  }],
  currentQuestion: questionSchema,
});

const Round = mongoose.model('Round', roundSchema);

export { Round, roundSchema };
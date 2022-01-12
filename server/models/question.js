import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  language: { type: String, required: true },
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  category: { type: String, required: true },
});

const Question = mongoose.model('Question', questionSchema);

export { Question, questionSchema };
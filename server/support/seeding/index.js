import fs from 'fs';
import mongoose from 'mongoose';
import { Question } from '../../models/question.js';

await mongoose.connect('mongodb://localhost:27017/quizzer');

const languages = {
  nl: JSON.parse(fs.readFileSync('questions.nl.json', 'utf8')),
  en: JSON.parse(fs.readFileSync('questions.en.json', 'utf8')),
};

console.info(`Deleting ${await Question.count()} old questions...`);

await Question.deleteMany();

for (const [language, questions] of Object.entries(languages)) {
  console.info(`Adding questions for language ${language}...`);

  for (const { question, answer, category } of questions) {
    await Question.create({ language, question, answer, category });
  }
}

console.info('Seeding finished.');

await mongoose.connection.close();
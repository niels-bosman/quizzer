import { configureStore } from '@reduxjs/toolkit';
import question from './reducers/question';
import quiz from './reducers/quiz';

export default configureStore({ reducer: { quiz, question } });
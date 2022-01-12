import { configureStore } from '@reduxjs/toolkit';
import category from './reducers/category';
import question from './reducers/question';
import quiz from './reducers/quiz';

export default configureStore({ reducer: { quiz, category, question } });
import { configureStore } from '@reduxjs/toolkit';
import quiz from './reducers/quiz';

export default configureStore({
  reducer: {
    quiz,
  }
});
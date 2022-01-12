import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../api';

const initialState = {
  all:     [],
  current: '',
  answers: [],
  open:    true,
};

export const fetchQuestions = createAsyncThunk('question/fetchQuestionsStatus', async (_, { getState }) => {
  const { lobbyId } = getState()?.quiz;
  const { data }    = await axios.get(`${BASE_URL}/lobbies/${lobbyId}/questions`);

  return data;
});

export const fetchAnswers = createAsyncThunk('question/fetchAnswersStatus', async (_, { getState }) => {
  const { lobbyId } = getState()?.quiz;
  const { data }    = await axios.get(`${BASE_URL}/lobbies/${lobbyId}/answers`);

  return data;
});

export const slice = createSlice({
  name:          'question',
  initialState,
  extraReducers: {
    [fetchQuestions.fulfilled]: (state, { payload }) => {
      state.all     = payload;
      state.current = initialState.current;
    },
    [fetchAnswers.fulfilled]:   (state, { payload }) => {
      state.answers = payload;
    },
  },
  reducers:      {
    resetAllQuestion: state => state = initialState,

    setCurrentQuestion: (state, { payload }) => {
      state.current = payload;
    },
    setCurrentAnswer:   (state, { payload }) => {
      state.currentAnswer = payload;
    },
    setQuestionOpen:    (state, { payload }) => {
      state.open = !!payload;
    },
    resetGivenAnswers:  (state) => {
      state.answers = initialState.answers;
    },
  }
});

export const {
  setCurrentQuestion,
  setCurrentAnswer,
  setQuestionOpen,
  resetGivenAnswers,
  resetAllQuestion,
} = slice.actions;

export default slice.reducer;
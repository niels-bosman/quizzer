import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  current: '',
  answers: []
};

export const fetchCurrentQuestion = createAsyncThunk('question/fetchCurrentQuestionStatus', async (_, { getState }) => {
  const { lobbyId } = getState()?.quiz;
  const { data }    = await axios.get(`${process.env.REACT_APP_API_URI}/lobbies/${lobbyId}/question`);

  return data;
});

export const fetchGivenAnswers = createAsyncThunk('question/fetchAnswersStatus', async (_, { getState }) => {
  const { lobbyId } = getState()?.quiz;
  const { data }    = await axios.get(`${process.env.REACT_APP_API_URI}/lobbies/${lobbyId}/answers`);

  return data;
});

export const slice = createSlice({
  name:          'question',
  initialState,
  extraReducers: {
    [fetchCurrentQuestion.fulfilled]: (state, { payload }) => {
      state.current = payload;
    },
    [fetchGivenAnswers.fulfilled]:    (state, { payload }) => {
      state.answers = payload;
    },
  },
});

export default slice.reducer;
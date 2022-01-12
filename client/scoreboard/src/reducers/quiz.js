import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  lobbyId: '',
  teams:   [],
  results: [],
};

export const fetchTeams = createAsyncThunk('category/fetchTeamsStatus', async (_, { getState }) => {
  const lobbyId = getState()?.quiz.lobbyId;
  const teams   = await axios.get(`${process.env.REACT_APP_API_URI}/lobbies/${lobbyId}/teams`);

  return teams.data;
});

export const fetchCorrectAnswers = createAsyncThunk('category/fetchCorrectAnswersStatus', async (_, { getState }) => {
  const lobbyId = getState()?.quiz.lobbyId;
  const teams   = await axios.get(`${process.env.REACT_APP_API_URI}/lobbies/${lobbyId}/round-score`);

  return teams.data;
});

export const fetchResults = createAsyncThunk('category/fetchResultsStatus', async (_, { getState }) => {
  const lobbyId    = getState()?.quiz.lobbyId;
  const results = await axios.get(`${process.env.REACT_APP_API_URI}/lobbies/${lobbyId}/lobby-score`);

  return results.data;
});

export const slice = createSlice({
  name:          'quiz',
  initialState,
  extraReducers: {
    [fetchTeams.fulfilled]:          (state, { payload }) => {
      state.teams = payload;
    },
    [fetchCorrectAnswers.fulfilled]: (state, { payload }) => {
      state.roundScore = payload;
    },
    [fetchResults.fulfilled]:        (state, { payload }) => {
      state.results = payload;
    }
  },
  reducers:      {
    setLobbyId: (state, { payload }) => {
      state.lobbyId = payload;
    }
  }
});

export const { setLobbyId } = slice.actions;

export default slice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../api';

const initialState = {
  language: 'nl',
  lobbyId:  '',
  teams:    [],
};

export const createLobby = createAsyncThunk('quiz/createLobbyStatus', async (masterCode, { getState }) => {
  const language = getState()?.quiz.language;
  try {
  const { data, status } = await axios.post(`${BASE_URL}/lobbies`, { language, masterCode });
    return { data, status };
  } catch ({ response: { data, status } }) {
    return { data, status };
  }
});

export const fetchTeams = createAsyncThunk('quiz/fetchTeamsStatus', async (_, { getState }) => {
  const lobbyId  = getState()?.quiz.lobbyId;
  const { data } = await axios.get(`${BASE_URL}/lobbies/${lobbyId}/teams`);

  return data;
});

export const setLanguage = createAsyncThunk('quiz/setLanguageStatus', async (language, { getState }) => {
  const lobbyId  = getState()?.quiz.lobbyId;
  const { data } = await axios.post(`${BASE_URL}/lobbies/${lobbyId}/language/${language}`);

  return data;
});

export const slice = createSlice({
  name:          'quiz',
  initialState,
  extraReducers: {
    [createLobby.fulfilled]: (state, { payload }) => {
      state.lobbyId = payload.data;
    },
    [fetchTeams.fulfilled]:  (state, { payload }) => {
      state.teams = payload;
    },
    [setLanguage.fulfilled]: (state, { payload }) => {
      state.language = payload;
    },
  },
  reducers:      {
    resetAllQuiz: state => state = initialState,
  }
});

export const { resetAllQuiz } = slice.actions;

export default slice.reducer;
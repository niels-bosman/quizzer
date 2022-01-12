import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../api';

const initialState = {
  teamName:    '',
  lobbyId:     '',
  question:    {},
  givenAnswer: '',
};

export const joinGame = createAsyncThunk('quiz/joinGameStatus', async ({ lobbyId, teamName }) => {
  try {
    const { status } = await axios.post(`${BASE_URL}/lobbies/${lobbyId}/teams`, { teamName });
    return { status };
  } catch ({ response: { status } }) {
    return { status };
  }
});

export const getQuestion = createAsyncThunk('quiz/getQuestionStatus', async ({ lobbyId }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/lobbies/${lobbyId}/question`);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
});

export const submitAnswer = createAsyncThunk('quiz/submitAnswerStatus', async ({ lobbyId, teamName, givenAnswer }) => {
  try {
    const { status } = await axios.post(`${BASE_URL}/lobbies/${lobbyId}/answers`, { teamName, givenAnswer });
    return { status };
  } catch ({ response: { status } }) {
    return { status };
  }
});

export const slice = createSlice({
  name:          'quiz',
  initialState,
  reducers:      {
    resetAll: state => state = initialState,

    setLobbyId:       (state, { payload }) => {
      state.lobbyId = payload;
    },
    setTeamName:      (state, { payload }) => {
      state.teamName = payload;
    },
    setAnswer:        (state, { payload }) => {
      state.givenAnswer = payload;
    },
    resetGivenAnswer: (state) => {
      state.givenAnswer = initialState.givenAnswer;
    },
  },
  extraReducers: {
    [getQuestion.fulfilled]: (state, { payload }) => {
      state.question = { question: payload.data.question, category: payload.data.category };
    },
  },
});

export const { setLobbyId, setTeamName, setAnswer, resetAll, resetGivenAnswer } = slice.actions;

export default slice.reducer;
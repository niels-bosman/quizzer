import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../api';

const initialState = {
  all:      [],
  selected: [],
};

export const fetchCategories = createAsyncThunk('category/fetchCategoriesStatus', async language => {
  const categories = await axios.get(`${BASE_URL}/categories`, { params: { language } });
  return categories.data;
});

export const slice = createSlice({
  name:          'category',
  initialState,
  reducers:      {
    resetAllCategory: state => state = initialState,

    select: (state, { payload }) => {
      if (state.selected.length < 3) state.selected.push(payload);
    },

    unselect: (state, { payload }) => {
      state.selected = state.selected.filter(category => category !== payload);
    },

    unselectAll: state => {
      state.selected = initialState.selected;
    }
  },
  extraReducers: {
    [fetchCategories.fulfilled]: (state, { payload }) => {
      state.all = payload;
    },
  },
});

export const { select, unselect, unselectAll, resetAllCategory } = slice.actions;

export default slice.reducer;
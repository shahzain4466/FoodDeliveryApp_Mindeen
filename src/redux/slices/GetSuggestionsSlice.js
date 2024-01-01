import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const GetSuggestionsSlice = createSlice({
  name: 'getSuggestions',
  initialState,
  reducers: {
    Started(state) {
      state.loading = true;
      state.error = null;
    },
    Completed(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    Failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
   
  },
});

export const {Started, Completed, Failed} = GetSuggestionsSlice.actions;

export default GetSuggestionsSlice.reducer;
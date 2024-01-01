import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const GetProfileInfoSlice = createSlice({
  name: 'profile',
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
    CleanupGetProfile(state) {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
});

export const {Started, Completed, Failed, CleanupGetProfile} =
  GetProfileInfoSlice.actions;

export default GetProfileInfoSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const ForgotPasswordSlice = createSlice({
  name: 'ForgotPassword',
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
    CleanupForgotPass(state) {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
});

export const {Started, Completed, Failed, CleanupForgotPass} = ForgotPasswordSlice.actions;

export default ForgotPasswordSlice.reducer;

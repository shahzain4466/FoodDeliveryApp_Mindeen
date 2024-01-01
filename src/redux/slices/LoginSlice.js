import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const LoginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    CleanupSignIn(state) {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
  },
});

export const {loginStart, loginSuccess, loginFailure, CleanupSignIn} = LoginSlice.actions;

export default LoginSlice.reducer;

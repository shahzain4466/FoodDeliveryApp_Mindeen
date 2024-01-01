import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const SignUpSlice = createSlice({
  name: 'SignUp',
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
    CleanupSignUp(state) {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
});

export const {Started, Completed, Failed, CleanupSignUp} = SignUpSlice.actions;

export default SignUpSlice.reducer;

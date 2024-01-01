import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const RegisterNumberSlice = createSlice({
  name: 'RegNumber',
  initialState,
  reducers: {
    regNumStart(state) {
      state.loading = true;
      state.error = null;
    },
    regNumSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    regNumFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    CleanupRegNum(state) {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
});

export const {regNumStart, regNumSuccess, regNumFailure, CleanupRegNum} = RegisterNumberSlice.actions;

export default RegisterNumberSlice.reducer;

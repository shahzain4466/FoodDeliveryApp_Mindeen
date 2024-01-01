import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const EditLocationSlice = createSlice({
  name: 'EditLocation',
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
    CleanupEditLocation(state) {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
});

export const {Started, Completed, Failed, CleanupEditLocation} = EditLocationSlice.actions;

export default EditLocationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  show: false, // Add a 'show' state to your Redux slice
};

const ShowAddmsgSlice = createSlice({
  name: 'showAddmsg',
  initialState,
  reducers: {
    Started(state) {
      state.loading = true;
      state.error = null;
    },
    Completed(state, action) {
      state.loading = false;
      state.show = action.payload; // Set the 'show' state based on the payload
    },
    Failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { Started, Completed, Failed } = ShowAddmsgSlice.actions;

export default ShowAddmsgSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const DeleteRecentsearchSlice = createSlice({
  name: 'DeleteSearches',
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
    CleanupDeleteMethod(state) {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
});

export const {Started, Completed, Failed, CleanupDeleteMethod} = DeleteRecentsearchSlice.actions;

export default DeleteRecentsearchSlice.reducer;

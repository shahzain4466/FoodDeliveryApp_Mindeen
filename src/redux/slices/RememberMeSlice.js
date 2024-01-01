import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  User: null,
};

const RememberMeSlice = createSlice({
  name: 'RememberMe',
  initialState,
  reducers: {
   
    StoreData(state, action) {
      state.loading = false;
      state.User = action.payload;
    },
   

  },
});

export const {StoreData} = RememberMeSlice.actions;

export default RememberMeSlice.reducer;

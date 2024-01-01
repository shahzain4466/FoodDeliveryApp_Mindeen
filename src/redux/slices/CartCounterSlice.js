import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  counter: '0', 
};

const CartCounterSlice = createSlice({
  name: 'cartCounter',
  initialState,
  reducers: {
    Started(state) {
      state.loading = true;
      state.error = null;
    },
    Completed(state, action) {
      state.loading = false;
      state.counter = action.payload;
    },
    Failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {Started, Completed, Failed} = CartCounterSlice.actions;

export default CartCounterSlice.reducer;

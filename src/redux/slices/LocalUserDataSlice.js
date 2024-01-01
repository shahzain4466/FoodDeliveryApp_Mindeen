import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isFirstTime: true,
  isAuthenticated: {status: false, token: null},
};

const LocalUserDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setIsFirstTime(state, action) {
      state.isFirstTime = action.payload;
    },
    clearData: state => {
      state.data = null;
    },
    cleanUp: state => {
      state.isFirstTime = false;
      state.data=null,
      state.isAuthenticated={status: false, token: null}
    } ,
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {setData, clearData, cleanUp, setIsFirstTime, setIsAuthenticated} =
  LocalUserDataSlice.actions;
export default LocalUserDataSlice.reducer;

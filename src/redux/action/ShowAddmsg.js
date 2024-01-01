import { Started, Completed, Failed } from '../slices/ShowAddmsgSlice';

// Define your action creator to receive a value
export const Showaddmsg = (show) => async (dispatch) => {
  try {
    dispatch(Started());
    dispatch(Completed(show)); // Store the 'show' value in the Redux state
  } catch (error) {
    const errorDetail = handleErrors(error);
    dispatch(Failed(errorDetail));
  }
};
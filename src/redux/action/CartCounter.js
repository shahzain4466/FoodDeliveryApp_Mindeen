import { Started, Completed, Failed } from '../slices/CartCounterSlice';

// Define your action creator to receive a value
export const CartCounter = (counter) => async (dispatch) => {
  try {
    dispatch(Started());
    dispatch(Completed(counter)); // Store the 'show' value in the Redux state
  } catch (error) {
    const errorDetail = handleErrors(error);
    dispatch(Failed(errorDetail));
  }
};
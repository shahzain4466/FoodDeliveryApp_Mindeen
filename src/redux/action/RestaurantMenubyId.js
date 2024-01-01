import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../slices/RestaurantMenuSlice';

export const RestaurantMenubyId = (id,token) => async dispatch => {
  try {
    dispatch(Started());
    const endpoint = `/api/v1/restaurant/menu/${id}`;
    const method = 'GET';
    const data = null;
    const response = await callApi(endpoint, method, data,token);
  
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, `/api/v1/restaurant/menu/${id}`);
    dispatch(Failed(errorDetail));
  }
};

import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {
  Started,
  Completed,
  Failed,
} from '../../redux/slices/GetOrderHistorySlice';

export const GetOrderHistory = token => async dispatch => {
  try {
    dispatch(Started());
    const endpoint = '/api/v1/order/past-orders';
    const method = 'GET';
    const data = null;
    const response = await callApi(endpoint, method, data, token);
    // console.warn("Resturant:------>", response)
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/restaurant/popular-restaurants');
    dispatch(Failed(errorDetail));
  }
};

import {callApi} from '../../../../config/apiCall';
import {handleErrors} from '../../../../utils/globalMethods';
import {Started, Completed, Failed} from '../../slices/LikeRestaurantSlice';
import axios from 'axios';
export const LikeRestaurant =
  (PopularRestaurantID, token) => async dispatch => {
    try {
      dispatch(Started());

      const endpoint = `/api/v1/users/likeRestaurant/${PopularRestaurantID}`;
      const method = 'POST';
      const data = {};
      const response = await callApi(endpoint, method, data, token);
      console.log('LikeRestaurant', response);

      dispatch(Completed(response));
      return response.success
    } catch (error) {
      const errorDetail = handleErrors(
        error,
        `/api/v1/users/likeRestaurant/${PopularRestaurantID}`,
      );
      dispatch(Failed(errorDetail));
    }
  };

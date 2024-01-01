import {callApi} from '../../../../config/apiCall';
import {handleErrors} from '../../../../utils/globalMethods';
import {
  Started,
  Completed,
  Failed,
} from '../../slices/LocationSlice/GetLocationSlice';

export const GetAllLocation = token => async dispatch => {
  try {
    dispatch(Started());
    const endpoint = '/api/v1/location/all';
    const method = 'GET';
    const data = null;
    const response = await callApi(endpoint, method, data, token);
    // console.warn("Hmm:------>", response)
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, 'api/v1/location/all');
    dispatch(Failed(errorDetail));
  }
};

import {callApi} from '../../../../config/apiCall';
import {handleErrors} from '../../../../utils/globalMethods';
import {
  Started,
  Completed,
  Failed,
} from '../../slices/LocationSlice/AddLocationSlice';

export const AddLocation = (address, token) => async dispatch => {
  try {
    dispatch(Started());
    const endpoint = '/api/v1/location/add';
    const method = 'POST';
    const data = {
      address,
    };
    const response = await callApi(endpoint, method, data, token);
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/location/add');
    dispatch(Failed(errorDetail));
  }
};

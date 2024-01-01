import {callApi} from '../../../../config/apiCall';
import {handleErrors} from '../../../../utils/globalMethods';
import {
  Started,
  Completed,
  Failed,
} from '../../slices/LocationSlice/DeleteLocationSlice';

export const DeleteLocation = (id, token) => async dispatch => {
  try {
    dispatch(Started());
    const endpoint = `/api/v1/location/delete/${id}`;
    const method = 'DELETE';
    const data = null;
    const response = await callApi(endpoint, method, data, token);
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/location/delete/');
    dispatch(Failed(errorDetail));
  }
};

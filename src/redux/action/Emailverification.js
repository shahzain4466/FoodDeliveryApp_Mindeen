import {callApi} from '../../../config/apiCall';
import { handleErrors } from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../slices/EmailverificationSlice'

export const Emailverification = (email)=> async dispatch => {
  try {
    dispatch(Started());
    const endpoint = '/api/v1/users/validate_email';
    const method = 'POST';
    const data = {
     email
    };
    const token = null;
    const response = await callApi(endpoint, method, data, token);
    console.log('validate email', response.data);
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/users/validate_email');
    dispatch(Failed(errorDetail));
  }
};

import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../slices/ForgotPasswordSlice';

export const ForgotPassword = contactOrEmail => async dispatch => {
  console.log('hello',contactOrEmail)
  try {
    dispatch(Started());
    const endpoint = '/api/v1/users/forgotpassword';
    const method = 'POST';
    const data = {
      contactOrEmail,
    };
    const response = await callApi(endpoint, method, data);
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/users/forgotpassword');
    dispatch(Failed(errorDetail));
  }
};

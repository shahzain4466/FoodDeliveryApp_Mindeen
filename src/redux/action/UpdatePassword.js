import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../slices/UpdatePasswordSlice';

export const UpdatePassword = (password,confirmPassword, token) => async dispatch => {
  try {
    dispatch(Started());
    const endpoint = '/api/v1/users/resetpassword';
    const method = 'POST';
    const data = {
      password,
      confirmPassword
    };
    const response = await callApi(endpoint, method, data, token);
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/users/resetpassword');
    dispatch(Failed(errorDetail));
  }
};

import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../slices/UpdatePasswordSlice';

export const ChangeUserPassword =
  (currentPassword, password, confirmPassword, token) => async dispatch => {
    console.log('currentPassword',currentPassword)
    try {
      dispatch(Started());
      const endpoint = '/api/v1/users/update-password';
      const method = 'PUT';
      const data = {
        currentPassword,
        password,
        confirmPassword,
      };
      const response = await callApi(endpoint, method, data, token);
      // console.warn('ChangePassword',response)
      dispatch(Completed(response));
    } catch (error) {
      const errorDetail = handleErrors(error, '/api/v1/users/update-password');
      dispatch(Failed(errorDetail));
    }
  };

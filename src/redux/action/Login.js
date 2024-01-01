import {callApi} from '../../../config/apiCall';
import {handleErrors, isValidEmail} from '../../../utils/globalMethods';
import {loginStart, loginSuccess, loginFailure} from '../slices/LoginSlice';

export const loginUser = (contactNumber, password) => async dispatch => {
  console.log(contactNumber, password);
  const data = {};
  const isEmail = isValidEmail(contactNumber);
  if (isEmail) {
    data.email = contactNumber;
  }else{
    data.contactNumber=contactNumber
  }
  data.password=password
  try {
    dispatch(loginStart());
    const endpoint = '/api/v1/users/login';
    const method = 'POST';
    const response = await callApi(endpoint, method, data);
    dispatch(loginSuccess(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/users/login');
    dispatch(loginFailure(errorDetail));
  }
};

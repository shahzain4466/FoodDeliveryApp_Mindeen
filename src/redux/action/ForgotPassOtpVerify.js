import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../slices/ForgotPassOtpVerifySlice';

export const ForgotPassOtpVerify = (verifyOtp, token) => async dispatch => {
  // console.warn(verifyOtp, token)
  try {
    dispatch(Started());
    const endpoint = '/api/v1/users/verifypasswordotp';
    const method = 'POST';
    const data = {
      verifyOtp,
    };
    const response = await callApi(endpoint, method, data, token);
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/users/verifypasswordotp');
    dispatch(Failed(errorDetail));
  }
};

import {callApi} from '../../../config/apiCall';
import { handleErrors } from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../slices/OtpVerificationSlice';

export const OtpVerification = (contactNumber, verifyOtp) => async dispatch => {
  try {
    dispatch(Started());
    const endpoint = '/api/v1/users/verifyotp';
    const method = 'POST';
    const data = {
      contactNumber: `+92${contactNumber}`,
      verifyOtp,
    };
    const token = null;
    const response = await callApi(endpoint, method, data, token);
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/users/verifyotp');
    dispatch(Failed(errorDetail));
  }
};

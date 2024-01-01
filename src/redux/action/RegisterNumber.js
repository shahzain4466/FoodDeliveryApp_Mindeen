import {callApi} from '../../../config/apiCall';
import { handleErrors } from '../../../utils/globalMethods';
import {
  regNumStart,
  regNumSuccess,
  regNumFailure,
} from '../slices/RegisterNumberSlice';

export const RegisterNumber = (contactNumber, countryCode) => async dispatch => {
  try {
    dispatch(regNumStart());
    const endpoint = '/api/v1/users/register/client';
    const method = 'POST';
    const data = {
      contactNumber: `+92${contactNumber}`,
      countryCode
    };

    const response = await callApi(endpoint, method, data);
    console.log('Number Registration Response',response)
    dispatch(regNumSuccess(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/users/register/client');
    dispatch(regNumFailure(errorDetail));
  }
};
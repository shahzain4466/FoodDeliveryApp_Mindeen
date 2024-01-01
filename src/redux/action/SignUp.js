import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../slices/SignUpSlice';

export const SignUp =
  (contactNumber, password, email, fullName, gender, dob) => async dispatch => {
    try {
      dispatch(Started());
      const endpoint = '/api/v1/users/signup/client';
      const method = 'POST';
      const data = {
        clientInformation: {
          contactNumber: `+92${contactNumber}`,
          password,
          email,
          fullName,
          gender,
          dob,
        },
      };

      const response = await callApi(endpoint, method, data);

      dispatch(Completed(response));
    } catch (error) {
      const errorDetail = handleErrors(error, '/api/v1/users/signup/client');
      dispatch(Failed(errorDetail));
    }
  };

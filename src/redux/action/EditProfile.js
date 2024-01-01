import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../../redux/slices/EditProfileSlice';

export const EditProfile =
  (email, fullName, gender, image_url, token) => async dispatch => {
  

    try {
      dispatch(Started());
      const endpoint = '/api/v1/users/profile/client/update';
      const method = 'PUT';
      const data = {
        clientInformation: {
          email,
          fullName,
          gender,
          image_url,
        },
      };
      const response = await callApi(endpoint, method, data, token);
      // console.warn("Resturant:------>", response)
      dispatch(Completed(response));
    } catch (error) {
      const errorDetail = handleErrors(
        error,
        '/api/v1/users/profile/client/update',
      );
      dispatch(Failed(errorDetail));
    }
  };

import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../../redux/slices/EditAppSettingSlice';

export const EditAppSetting =
  (emailNotifications,smsNotifications,mobileNotifications,darkMode, token) => async (dispatch) => {

    try {
      dispatch(Started());
      const endpoint = '/api/v1/clientapp-settings/edit';
      const method = 'PUT';
      const data = {
        appSettings: {
          emailNotifications,
          smsNotifications,
          mobileNotifications,
          darkMode
      }
      };
      const response = await callApi(endpoint, method, data, token);
      // console.log("EditSetting:------>", response)
      dispatch(Completed(response));
    } catch (error) {
      const errorDetail = handleErrors(
        error,
        '/api/v1/clientapp-settings/edit',
      );
      dispatch(Failed(errorDetail));
    }
  };

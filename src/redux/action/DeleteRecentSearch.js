import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods'
import {
  Started,
  Completed,
  Failed,
} from '../slices/DeleteRecentsearchSlice'

export const DeleteRecentSearch = (id, token) => async dispatch => {
  try {
    dispatch(Started());
    const endpoint = `/api/v1/search/recent/${id}`;
    const method = 'DELETE';
    const data = null;
    const response = await callApi(endpoint, method, data, token);
    dispatch(Completed(response));
    // console.log('Deletemethod',response);
  } catch (error) {
    const errorDetail = handleErrors(error, `/api/v1/search/recent/${id}`);
    dispatch(Failed(errorDetail));
  }
};

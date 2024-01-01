import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../slices/GetHomeSearchSlice'

export const GetHomeSearch = (token,selectedOption,name) => async dispatch => {
  console.log('test',token,selectedOption,name);
  try {
    dispatch(Started());
    const endpoint = `/api/v1/search/all?${selectedOption}=true&searchValue=${name}`;
    const method = 'GET';
    const data = null;
    const response = await callApi(endpoint, method, data, token);
    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, `/api/v1/search/all?${selectedOption}=true&searchValue=${name}`);
    dispatch(Failed(errorDetail));
  }
};
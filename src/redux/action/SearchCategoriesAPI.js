import { callApi } from '../../../config/apiCall';
import { handleErrors } from '../../../utils/globalMethods';
import { Started, Completed, Failed } from '../slices/SearchCategoriesSlice';

export const GetSearchCategory = () => async dispatch => {
    try {
        dispatch(Started());
        const endpoint = '/api/v1/search-category/all';
        const method = 'GET';
        const data = null;
        const response = await callApi(endpoint, method, data);
        dispatch(Completed(response));
    } catch (error) {
        const errorDetail = handleErrors(error, '/api/v1/search-category/all');
        dispatch(Failed(errorDetail));
    }
};

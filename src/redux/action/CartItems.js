import { callApi } from '../../../config/apiCall';
import { handleErrors } from '../../../utils/globalMethods';
import { Started, Completed, Failed } from '../slices/CartItemsSlice'

export const CartItems = token => async dispatch => {
    try {
        dispatch(Started());
        const endpoint = '/api/v1/addtocart/all/';
        const method = 'GET';
        const data = null;
        const response = await callApi(endpoint, method, data, token);
        dispatch(Completed(response));
    } catch (error) {
        const errorDetail = handleErrors(error, '/api/v1/addtocart/all/');
        dispatch(Failed(errorDetail));
    }
};
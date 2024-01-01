import { callApi } from '../../../config/apiCall';
import { handleErrors } from '../../../utils/globalMethods';
import { Started, Completed, Failed } from '../slices/PlaceOrderSlice';

export const PlaceOrder =
    (token, orderData) => async dispatch => {

        console.log('==>>', JSON.stringify(orderData));
        console.log('==>>', token);
        try {
            dispatch(Started());
            const endpoint = '/api/v1/order/create';
            const method = 'POST';
            const data = {
                "orderInformation": orderData?.orderInformation
            }
            const response = await callApi(endpoint, method, orderData, token);

            dispatch(Completed(response));
        } catch (error) {
            const errorDetail = handleErrors(error, "/api/v1/order/create");
            dispatch(Failed(errorDetail));
        }
    };

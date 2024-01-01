import { callApi } from '../../../config/apiCall';
import { handleErrors } from '../../../utils/globalMethods';
import { Started, Completed, Failed } from '../slices/AddPaymentMethodSlice';

export const AddPaymentAPI =
  (cardNumber,cardHolderName,expiry_date,cvc_cvv,token) => async dispatch => {
console.log(cardNumber, cardHolderName, expiry_date, cvc_cvv,token);
    try {
      dispatch(Started());
      const endpoint = '/api/v1/payment-method/add';
      const method = 'POST';
      const data = {
        paymentInformation: {
          cardNumber,
          cardHolderName,
          cvc_cvv,
          expiry_date
        },
      };

      const response = await callApi(endpoint, method, data,token);
      console.log('ADDPayment Response', response)
      dispatch(Completed(response));
    } catch (error) {
      const errorDetail = handleErrors(error, '/api/v1/payment-method/add');
      dispatch(Failed(errorDetail));
    }
  };

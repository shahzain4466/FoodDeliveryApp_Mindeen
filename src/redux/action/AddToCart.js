import {callApi} from '../../../config/apiCall';
import {handleErrors} from '../../../utils/globalMethods';
import {Started, Completed, Failed} from '../slices/AddToCartSlice';

export const AddToCart = (token, cartData) => async dispatch => {
  // console.log(' API Data==>>', JSON.stringify(cartData));

  const restaurantId = cartData?.restaurantId;

  try {
    dispatch(Started());
    const endpoint = '/api/v1/addtocart/create';
    const method = 'POST';
    const data = {
      restaurantId,
      removePreviousCart: false,
      addToCartInformation: {
        items: cartData?.addToCartInformation?.items,
        deals: cartData?.addToCartInformation?.deals,
        choiceGroups: [
          {
            choiceGroupId: '6553c8cd2c9e6c340be8a6d6',
            quantity: 1,
          },
        ],
        totalAmount: cartData?.addToCartInformation?.totalAmount,
        note: cartData?.addToCartInformation?.note,
      },
      // addToCartInformation,
    };

    const response = await callApi(endpoint, method, data, token);

    dispatch(Completed(response));
  } catch (error) {
    const errorDetail = handleErrors(error, '/api/v1/addtocart/create');
    dispatch(Failed(errorDetail));
  }
};

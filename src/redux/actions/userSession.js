//auth actions...
import {
  EXTRA_FOOD_DATA,
  EXTRA_SAUCES
} from './types';


export const extrafood = (payload) => ({
  type: EXTRA_FOOD_DATA,
  payload,
});
export const extraSauce = (payload) => ({
  type: EXTRA_SAUCES,
  payload,
});

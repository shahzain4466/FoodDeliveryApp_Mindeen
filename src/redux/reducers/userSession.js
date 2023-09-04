import {
  EXTRA_FOOD_DATA,
  EXTRA_SAUCES
} from '../actions/types';

const INITIAL_STATE = {
  foodData: [
    {
      id: 1,
      name: 'Pepper Julienned',
      price: '+$2.30',
      image: require('../../Assets/Images/PepperJulienned.png')
    },
    {
      id: 2,
      name: 'Baby Spinach',
      price: '+$4.70',
      image: require('../../Assets/Images/BabySpinach.png')
    },
    {
      id: 3,
      name: 'Fresh Juice',
      price: '+$2.50',
      image: require('../../Assets/Images/FreshJuice.png')
    },
    {
      id: 4,
      name: 'Coca Cola',
      price: '+$4.00',
      image: require('../../Assets/Images/CocaCola.png')
    },
  ],
  extrasauce: [
    {
      id: 5,
      name: 'BBQ Sauce',
      price: '+$2.30',
      image: require('../../Assets/Images/BBQSauce.png')
    },
    {
      id: 6,
      name: 'Garlic Sauce',
      price: '+$2.30',
      image: require('../../Assets/Images/GarlicSauce.png')
    },
  ],
};


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXTRA_FOOD_DATA:
      return {
        ...state,
        foodData: action.payload,
      };
    case EXTRA_SAUCES:
      return {
        ...state,
        extrasauce: action.payload,
      };
    default:
      return state;
  }
}

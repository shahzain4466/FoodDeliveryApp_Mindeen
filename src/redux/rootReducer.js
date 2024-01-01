import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
//* Local Slice to Store Data
import LocalUserDataSlice from './slices/LocalUserDataSlice';
//* API Slices
import LoginSlice from './slices/LoginSlice';
import RegisterNumberSlice from './slices/RegisterNumberSlice';
import OtpVerificationSlice from './slices/OtpVerificationSlice';
import SignUpSlice from './slices/SignUpSlice';
import ForgotPasswordSlice from './slices/ForgotPasswordSlice';
import ForgotPassOtpVerifySlice from './slices/ForgotPassOtpVerifySlice';
import UpdatePasswordSlice from './slices/UpdatePasswordSlice';
import GetProfileInfoSlice from './slices/GetProfileInfoSlice';
import AddLocationSlice from './slices/LocationSlice/AddLocationSlice';
import EditLocationSlice from './slices/LocationSlice/EditLocationSlice';
import DeleteLocationSlice from './slices/LocationSlice/DeleteLocationSlice';
import GetLocationSlice from './slices/LocationSlice/GetLocationSlice';
import RememberMeSlice from './slices/RememberMeSlice';
import GetRestaurantsSlice from './slices/GetRestaurantsSlice';
import GetOrderHistorySlice from './slices/GetOrderHistorySlice';
import EditProfileSlice from './slices/EditProfileSlice';
import ChangePasswordSlice from './slices/ChangePasswordSlice';
import GetPaymentMethodSlice from './slices/GetPaymentMethodSlice';
import AddPaymentMethodSlice from './slices/AddPaymentMethodSlice';
import GetAppSettingSlice from './slices/GetAppSettingSlice';
import EditAppSettingSlice from './slices/EditAppSettingSlice';
import DeleteMethodSlice from './slices/DeleteMethodSlice';
import GetOrderSlice from './slices/GetOrderSlice';
import EmailverificationSlice from './slices/EmailverificationSlice';
import GetSuggestionsSlice from './slices/GetSuggestionsSlice';
import GetRecentSearchSlice from './slices/GetRecentSearchSlice';
import GetHomeSearchSlice from './slices/GetHomeSearchSlice';
import ShowAddmsgSlice from './slices/ShowAddmsgSlice';
import CartCounterSlice from './slices/CartCounterSlice';
import DeleteRecentsearchSlice from './slices/DeleteRecentsearchSlice';
import RestaurantMenuSlice from './slices/RestaurantMenuSlice';
import MenuCategoriesSlice from './slices/MenuCategoriesSlice';
import AddToCartSlice from './slices/AddToCartSlice';
import CartItemsSlice from './slices/CartItemsSlice';
import PlaceOrderSlice from './slices/PlaceOrderSlice';
import SearchCategoriesSlice from './slices/SearchCategoriesSlice';
import LikeRestaurantSlice from './slices/LikeRestaurantSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userData', 'rememberme', 'GetLocationSlice'],
};

const rootReducer = combineReducers({
  login: LoginSlice,
  regNum: RegisterNumberSlice,
  otpVerify: OtpVerificationSlice,
  signUp: SignUpSlice,
  forgotPass: ForgotPasswordSlice,
  forgotPassOtpVerify: ForgotPassOtpVerifySlice,
  updatePass: UpdatePasswordSlice,
  userData: LocalUserDataSlice,
  profileInfo: GetProfileInfoSlice,
  addLocation: AddLocationSlice,
  editLocation: EditLocationSlice,
  deleteLocation: DeleteLocationSlice,
  getLocation: GetLocationSlice,
  rememberme: RememberMeSlice,
  restaurantsdata: GetRestaurantsSlice,
  orderHistoryData: GetOrderHistorySlice,
  editProfile: EditProfileSlice,
  editPassword: ChangePasswordSlice,
  getmethods: GetPaymentMethodSlice,
  AddPayment: AddPaymentMethodSlice,
  deleteMethods: DeleteMethodSlice,
  getAppSettings: GetAppSettingSlice,
  editSetting: EditAppSettingSlice,
  getOrders: GetOrderSlice,
  emailVerify: EmailverificationSlice,
  getSuggestions: GetSuggestionsSlice,
  getRecentSearch: GetRecentSearchSlice,
  getHomeSearch: GetHomeSearchSlice,
  showAddmsg: ShowAddmsgSlice,
  cartCounter: CartCounterSlice,
  DeleteSearches: DeleteRecentsearchSlice,
  getRestaurantMenu: RestaurantMenuSlice,
  getMenuCategories: MenuCategoriesSlice,
  addToCart: AddToCartSlice,
  getCartItems: CartItemsSlice,
  placeOrder: PlaceOrderSlice,
  searchCategory: SearchCategoriesSlice,
  likesRestuarants: LikeRestaurantSlice,
});

export default persistReducer(persistConfig, rootReducer);

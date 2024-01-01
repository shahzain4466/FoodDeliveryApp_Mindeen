import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../constants/constants';
//* Screens
import HomeScreen from '../components/screens/HomeScreen';

import SearchScreen from '../components/screens/SearchScreen';
import LocationsScreen from '../components/screens/LocationsScreen';
import CartScreen from '../components/screens/CartScreen';
import NotificationsScreen from '../components/screens/NotificationsScreen';
import LikedScreen from '../components/screens/LikedScreen';
import MainMenuScreen from '../components/screens/MainMenuScreen';

import MapScreen from '../components/screens/MapScreen';
import PopularRestaurant from '../components/screens/PopularRestaurantScreen'
import ChangePassword from '../components/screens/ChangePassword';
import ProfileScreen from '../components/screens/ProfileScreen';
import PastOrderScreen from '../components/screens/PastOrderScreen'
//* Bottom Tab ICONS
import Explore from '../assets/svg/BottomTabIcons/PathIcon.js';
import Heart from '../assets/svg/BottomTabIcons/HeartIcon.js';
import CartIcon from '../assets/svg/BottomTabIcons/HandBagIcon.js';
import Location from '../assets/svg/BottomTabIcons/LocationIcon.js';
import Notifications from '../assets/svg/BottomTabIcons/BellIcon.js';
//* Others
import { scale } from '../../utils/scale';
import theme from '../themes/theme';
import { useSelector, useDispatch } from 'react-redux';
import { requestLocationPermission } from '../../utils/globalMethods';
import MyOrders from '../components/screens/MyOrders';
import Payment from '../components/screens/PaymentMethod';
import SaveDetails from '../components/screens/SaveDetails';
import SettingScreen from '../components/screens/SettingScreen';
import InviteFreinds from '../components/screens/InviteFriends';
import AddPaymentMethod from '../components/screens/AddPaymentMethod';
import RestaurantMenu from '../components/screens/RestaurantMenu';
import AddQuantity from '../components/screens/AddQuantity';
import MyAddresses from '../components/screens/MyAddresses';
import ConfirmOrder from '../components/screens/ConfirmOrder';
import TrackOrder from '../components/screens/TrackOrder';
import AddNewCard from '../components/screens/AddNewCard';
import OrderMap from '../components/screens/OrderMap';
import TrackOrderlocation from '../components/screens/TrackOrderlocation';

//* Define the screenOptions configuration
let counter;
const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarLabel: '',
  tabBarStyle: [styles.BottomTabStyling, null],
  tabBarIcon: ({ focused }) => {
    let Icon;
    const widthAndHeightProps = { width: scale(42), height: scale(42) };
    if (route.name === Screens.Home) {
      Icon = Explore;
    } else if (route.name === Screens.Locations) {
      Icon = Location;
    } else if (route.name === Screens.Cart) {
      Icon = (props) => <CartIcon active={counter>0 ?true : focused? true : false} counter={counter} />;
    } else if (route.name === Screens.Liked) {
      Icon = Heart;
    } else if (route.name === Screens.Notifications) {
      Icon = Notifications;
    }
    return <Icon active={focused} {...widthAndHeightProps} />;
  },
});

const Stack = createStackNavigator();

//* Show Bottom Tabs On Specific Screens
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={Screens.Home} component={HomeScreen} />
      <Tab.Screen name={Screens.Locations} component={LocationsScreen} />
      <Tab.Screen name={Screens.Cart} component={CartScreen} />
      <Tab.Screen name={Screens.Liked} component={LikedScreen} />
      <Tab.Screen name={Screens.Notifications} component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  //* Request Location Permission
  counter = useSelector((state) => state.cartCounter.counter);
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <Stack.Navigator
      // initialRouteName={Screens.Map}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Tabs'} component={Tabs} />
      <Stack.Screen name={Screens.MainMenu} component={MainMenuScreen} />
      <Stack.Screen name={Screens.Settings} component={SettingScreen} />
      <Stack.Screen name={Screens.Map} component={MapScreen} />
      <Stack.Screen name={Screens.Search} component={SearchScreen} />
      <Stack.Screen name={Screens.RestaurantMenue} component={RestaurantMenu} />
      <Stack.Screen name={Screens.AddQuantity} component={AddQuantity} />
      <Stack.Screen name={Screens.Profile} component={ProfileScreen} />
      <Stack.Screen name={Screens.MyOrders} component={MyOrders} />
      <Stack.Screen name={Screens.Payment} component={Payment} />
      <Stack.Screen name={Screens.InviteFriends} component={InviteFreinds} />
      <Stack.Screen name={Screens.SaveDetails} component={SaveDetails} />
      <Stack.Screen name={Screens.PopularRestaurant} component={PopularRestaurant} />
      <Stack.Screen name={Screens.PastOrder} component={PastOrderScreen} />
      <Stack.Screen name={Screens.ChangePassword} component={ChangePassword} />
      <Tab.Screen name={Screens.LocationsScreen} component={LocationsScreen} />
      <Tab.Screen name={Screens.MYAddresses} component={MyAddresses} />
      <Stack.Screen name={Screens.AddPaymentMethod} component={AddPaymentMethod} />
      <Stack.Screen name={Screens.ConfirmOrder} component={ConfirmOrder} />
      <Stack.Screen name={Screens.TrackOrder} component={TrackOrder} />
      <Stack.Screen name={Screens.TrackOrderlocation} component={TrackOrderlocation} />
      <Stack.Screen name={Screens.AddNewCard} component={AddNewCard} />
      <Stack.Screen name={Screens.OrderMap} component={OrderMap} />

    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  BottomTabStyling: {
    height: scale(74),
    paddingHorizontal: scale(20, true),
    paddingVertical: scale(12),
    backgroundColor: theme.palette.white,
    borderTopLeftRadius: theme.radius.r2,
    borderTopRightRadius: theme.radius.r2,
  },
});

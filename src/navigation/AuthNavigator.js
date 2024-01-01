import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
//* Screens
import IntroScreen from '../components/screens/IntroScreen';
import LoginScreen from '../components/screens/LoginScreen';
import SignupScreen from '../components/screens/SignupScreen';
import ForgotPasswordScreen from '../components/screens/ForgotPasswordScreen';
import OtpScreen from '../components/screens/OtpScreen';
import PhoneRegistrationScreen from '../components/screens/PhoneRegistrationScreen';
import UpdatePasswordScreen from '../components/screens/UpdatePasswordScreen';
//* Others
import {Screens} from '../constants/constants';
import {setIsFirstTime} from '../redux/slices/LocalUserDataSlice';
//! Test
import DummyScreen from '../components/screens/DummyScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const isFirstTime = useSelector(state => state.userData.isFirstTime);

  const dispatch = useDispatch();

  /*
   * Set The Status of isFirstTime to Never Show the
   * Intro Screen Again If He Login 2nd Time
   */
  useEffect(() => {
    console.log('isFirstTime',isFirstTime)
    if (!isFirstTime) {
      dispatch(setIsFirstTime(false));
    }
  }, [isFirstTime, dispatch]);

  return (
    <Stack.Navigator
      // initialRouteName={Screens.UpdatePassword}
      screenOptions={{
        headerShown: false,
      }}>
      {isFirstTime && (
        <Stack.Screen name={Screens.Intro} component={IntroScreen} />
      )}
      <Stack.Screen name={Screens.Login} component={LoginScreen} />
      <Stack.Screen
        name={Screens.ForgotPassword}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name={Screens.SignUp} component={SignupScreen} />
      <Stack.Screen name={Screens.Otp} component={OtpScreen} />
      <Stack.Screen
        name={Screens.PhoneRegistration}
        component={PhoneRegistrationScreen}
      />
      <Stack.Screen
        name={Screens.UpdatePassword}
        component={UpdatePasswordScreen}
      />
      {/* Test Screen */}
      <Stack.Screen name={Screens.Dummy} component={DummyScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

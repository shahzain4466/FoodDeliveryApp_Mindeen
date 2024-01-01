import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

//* Navigators
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
const Stack = createStackNavigator();

const MainNavigator = () => {
  const isAuthenticated = useSelector(state => state.userData.isAuthenticated);
  return (
    <NavigationContainer>
      {isAuthenticated.status ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="App" component={AppNavigator} />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;

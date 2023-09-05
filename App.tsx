import { StyleSheet, Text, View, LogBox } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/Screens/Splash';
import Home from './src/Screens/HomeScreen/Home';
import Location from './src/Screens/Location';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/redux';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreAllLogs();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs([
  "[VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
]);
LogBox.ignoreLogs([
  '[Warning: Each child in a list should have a unique "key" prop',
]);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Location" component={Location} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
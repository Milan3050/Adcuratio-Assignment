import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../components/SplashScreen';
import HomeScreen from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

const NavigationProvider = () => {
  return <AuthStack />;
};

export default NavigationProvider;

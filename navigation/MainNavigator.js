import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../Screen/Auth/list/LoginScreen';
import RegisterScreen from '../Screen/Auth/list/RegisterScreen';
import DrawerNavigator from './DrawerNavigator';
import WelcomeScreen from '../Screen/Auth/list/WelcomeScreen';

const Stack = createStackNavigator();

const MainNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
        <Stack.Screen name="Dashboard" component={DrawerNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
);
export default MainNavigator;

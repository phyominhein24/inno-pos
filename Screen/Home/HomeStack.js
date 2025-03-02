import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeListScreen from './list/HomeListScreen';
import SearchItemList from './list/SearchItemList';

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator 
    initialRouteName="HomeList" 
    screenOptions={{ headerShown: true }} // Default behavior
>
    <Stack.Screen 
        name="HomeList" 
        component={HomeListScreen} 
        options={{ headerShown: false }} // Hide header for HomeList
    />
    <Stack.Screen 
        name="SearchItemList" 
        component={SearchItemList} 
        options={{ headerShown: false }} // Hide header for HomeList
    />
</Stack.Navigator>
);
export default HomeStack;

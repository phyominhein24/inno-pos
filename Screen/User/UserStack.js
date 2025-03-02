import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserListScreen from './list/UserListScreen';
import UserCreateScreen from './entry/UserCreateScreen';
import UserUpdateScreen from './entry/UserUpdateScreen';
import { CreateHeader } from '../../navigation/header/CreateHeader';

const Stack = createStackNavigator();

const UserStack = () => (
    <Stack.Navigator 
    initialRouteName="UserList" 
    screenOptions={{ headerShown: true }} // Default behavior
>
    <Stack.Screen 
        name="UserList" 
        component={UserListScreen} 
        options={{ headerShown: false }} // Hide header for UserList
    />
    <Stack.Screen 
        name="UserCreate" 
        component={UserCreateScreen} 
        options={{ headerShown: false }}
    />
    <Stack.Screen 
        name="UserUpdate" 
        component={UserUpdateScreen} 
        options={{ headerShown: false }}
        // options={{ 
        //     header: ({ navigation }) => <CreateHeader navigation={navigation} /> 
        // }} 
    />
</Stack.Navigator>
);
export default UserStack;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingUpdateScreen from './list/SettingUpdateScreen';
import { CreateHeader } from '../../navigation/header/CreateHeader';

const Stack = createStackNavigator();

const SettingStack = () => (
    <Stack.Navigator 
        initialRouteName="SettingUpdate" 
        screenOptions={{ headerShown: false }} // Default behavior
    >
        <Stack.Screen 
            name="SettingUpdate" 
            component={SettingUpdateScreen} 
        />
    </Stack.Navigator>
);

export default SettingStack;

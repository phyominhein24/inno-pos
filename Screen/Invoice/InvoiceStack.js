import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import InvoiceListScreen from './list/InvoiceListScreen';
import InvoiceCreateScreen from './entry/InvoiceCreateScreen';
import InvoiceUpdateScreen from './entry/InvoiceUpdateScreen';
import { CreateHeader } from '../../navigation/header/CreateHeader';

const Stack = createStackNavigator();

const InvoiceStack = () => (
    <Stack.Navigator 
    initialRouteName="InvoiceList" 
    screenOptions={{ headerShown: true }} // Default behavior
>
    <Stack.Screen 
        name="InvoiceList" 
        component={InvoiceListScreen} 
        options={{ headerShown: false }} // Hide header for InvoiceList
    />
    <Stack.Screen 
        name="InvoiceCreate" 
        component={InvoiceCreateScreen} 
        options={{ headerShown: true }}
    />
    <Stack.Screen 
        name="InvoiceUpdate" 
        component={InvoiceUpdateScreen} 
        options={{ headerShown: true }}
        // options={{ 
        //     header: ({ navigation }) => <CreateHeader navigation={navigation} /> 
        // }} 
    />
</Stack.Navigator>
);
export default InvoiceStack;

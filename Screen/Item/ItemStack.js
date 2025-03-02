import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ItemListScreen from './list/ItemListScreen';
import ItemCreateScreen from './entry/ItemCreateScreen';
import ItemUpdateScreen from './entry/ItemUpdateScreen';
import { CreateHeader } from '../../navigation/header/CreateHeader';

const Stack = createStackNavigator();

const ItemStack = () => (
    <Stack.Navigator 
    initialRouteName="ItemList" 
    screenOptions={{ headerShown: true }} // Default behavior
>
    <Stack.Screen 
        name="ItemList" 
        component={ItemListScreen} 
        options={{ headerShown: false }} // Hide header for ItemList
    />
    <Stack.Screen 
        name="ItemCreate" 
        component={ItemCreateScreen} 
        options={{ headerShown: true }}
    />
    <Stack.Screen 
        name="ItemUpdate" 
        component={ItemUpdateScreen} 
        options={{ headerShown: true }}
        // options={{ 
        //     header: ({ navigation }) => <CreateHeader navigation={navigation} /> 
        // }} 
    />
</Stack.Navigator>
);
export default ItemStack;

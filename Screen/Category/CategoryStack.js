import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CategoryListScreen from './list/CategoryListScreen';
import CategoryCreateScreen from './entry/CategoryCreateScreen';
import CategoryUpdateScreen from './entry/CategoryUpdateScreen';
import { CreateHeader } from '../../navigation/header/CreateHeader';

const Stack = createStackNavigator();

const CategoryStack = () => (
    <Stack.Navigator 
    initialRouteName="CategoryList" 
    screenOptions={{ headerShown: true }} // Default behavior
>
    <Stack.Screen 
        name="CategoryList" 
        component={CategoryListScreen} 
        options={{ headerShown: false }} // Hide header for CategoryList
    />
    <Stack.Screen 
        name="CategoryCreate" 
        component={CategoryCreateScreen} 
        options={{ headerShown: true }}
    />
    <Stack.Screen 
        name="CategoryUpdate" 
        component={CategoryUpdateScreen} 
        options={{ headerShown: true }}
        // options={{ 
        //     header: ({ navigation }) => <CreateHeader navigation={navigation} /> 
        // }} 
    />
</Stack.Navigator>
);
export default CategoryStack;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import DashboardScreen from '../Screen/Dashboard/list/DashboardScreen';
import LogoutScreen from '../Screen/Auth/list/LogoutScreen';
import ItemStack from '../Screen/Item/ItemStack';
import UserStack from '../Screen/User/UserStack';
import SettingStack from '../Screen/Setting/SettingStack';
import CategoryStack from '../Screen/Category/CategoryStack';
import InvoiceStack from '../Screen/Invoice/InvoiceStack';
import HomeStack from '../Screen/Home/HomeStack';
import { keys } from '../constants/config';
import { getData } from '../helpers/localstorage';
import { imageURL } from '../constants/endpoints';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getData(keys.USER);
      if (userData) {
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image source={user?.photo ? { uri: `${imageURL}${user.photo}` } : require('../assets/user.png')} style={styles.profileImage} />
        <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'guest@example.com'}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator 
    initialRouteName="Dashboard" 
    drawerContent={(props) => <CustomDrawerContent {...props} />} 
    screenOptions={{ 
      headerShown: false,
      drawerStyle: { backgroundColor: '#f8f9fa' },
      drawerLabelStyle: { fontSize: 16, fontWeight: 'bold' },
      drawerActiveTintColor: '#007bff',
      drawerInactiveTintColor: '#333',
    }}
  >
    <Drawer.Screen 
      name="Dashboard" 
      component={DashboardScreen} 
      options={{ 
        drawerIcon: ({ color }) => <Ionicons name="speedometer" size={24} color={color} />,
      }} 
    />
    <Drawer.Screen 
      name="Home" 
      component={HomeStack} 
      options={{ 
        drawerIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
      }} 
    />
    {/* <Drawer.Screen 
      name="Items" 
      component={ItemStack} 
      options={{ 
        drawerIcon: ({ color }) => <MaterialIcons name="inventory" size={24} color={color} />
      }} 
    />
    <Drawer.Screen 
      name="Category" 
      component={CategoryStack} 
      options={{ 
        drawerIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} /> 
      }} 
    /> */}
    <Drawer.Screen 
      name="Invoice" 
      component={InvoiceStack} 
      options={{ 
        drawerIcon: ({ color }) => <MaterialIcons name="receipt" size={24} color={color} /> 
      }} 
    />
    <Drawer.Screen 
      name="Customer" 
      component={UserStack} 
      options={{ 
        drawerIcon: ({ color }) => <Ionicons name="people" size={24} color={color} /> 
      }} 
    />
    <Drawer.Screen 
      name="Settings" 
      component={SettingStack} 
      options={{ 
        drawerIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} /> 
      }} 
    />
    <Drawer.Screen 
      name="Logout" 
      component={LogoutScreen} 
      options={{ 
        drawerIcon: ({ color }) => <Ionicons name="log-out" size={24} color="red" />, 
        drawerLabelStyle: { color: 'red' },
      }} 
    />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 14,
    color: '#ddd',
  },
});

export default DrawerNavigator;

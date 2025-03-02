import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, StyleSheet, Platform } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../userService'; 
import { userPayload } from '../userPayload';  
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const UserUpdateScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // Initialize payload with existing user data
  const [payload, setPayload] = useState({
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    profile: data?.profile || '',
  });

  useEffect(() => {
    if (user) {
      setPayload(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        profile: user.profile || '',
      }));
    }
  }, [user]);

  const handleChange = (key, value) => {
    setPayload(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitUser = async () => {
    try {
      const response = await userService.update(dispatch, data?.id, payload);
      console.log("Response:", response);
  
      if (response && response.status === 200) {
        navigation.navigate('UserList');
      } else {
        console.error("Invalid response:", response);
        alert(`Error: Invalid response from server`);
      }
    } catch (error) {
      console.error("Submit User Error:", error.message || error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{payload.name || 'User Details'}</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          {/* <Image source={{ uri: payload.profile || 'https://via.placeholder.com/100' }} style={styles.profileImage} /> */}
          
          {/* Editable Fields */}
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={payload.name}
            onChangeText={(text) => handleChange('name', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={payload.email}
            keyboardType="email-address"
            onChangeText={(text) => handleChange('email', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Phone"
            value={payload.phone}
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange('phone', text)}
          />

          <Text style={styles.balance}>150,000,000 Ks</Text>
          <Text style={styles.balanceLabel}>Total Balance (Ks)</Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={submitUser}>
          <Text style={styles.buttonText}>UPDATE CUSTOMER</Text>
        </TouchableOpacity>

        {/* Invoice List */}
        <Text style={styles.invoiceHeader}>INVOICE LIST</Text>
        {[1, 2, 3, 4].map((item, index) => (
          <View key={index} style={styles.invoiceCard}>
            <Image source={require('../../../assets/logo.png')} style={styles.invoiceIcon} />
            <View>
              <Text style={styles.invoiceNumber}>934043843494</Text>
              <Text style={styles.invoiceDate}>01/03/2025 12:00:30 PM</Text>
            </View>
            <Text style={styles.invoiceAmount}>+138,500.00</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    // padding: 10,
    marginTop: Platform.OS === 'android'? Constants.statusBarHeight : 0,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#fff',
      marginBottom: 10,
      elevation: 3,
  },
  headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: '#C49A6C',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
  balance: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#A87C4F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  invoiceHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  invoiceCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginHorizontal: 15,
  },
  invoiceIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  invoiceNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  invoiceDate: {
    fontSize: 12,
    color: 'gray',
  },
  invoiceAmount: {
    marginLeft: 'auto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default UserUpdateScreen;

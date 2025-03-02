import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../userService'; 
import { userPayload } from '../userPayload';  
import { Ionicons } from '@expo/vector-icons';

const UserUpdateScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const { user } = useSelector(state => state.user);
  const [payload, setPayload] = useState(userPayload.update);
  const dispatch = useDispatch();

  const submitUser = async () => {
    try {
      const response = await userService.update(dispatch, data?.id, payload);
      if(response.status === 200){
        navigation.navigate('UserList');
      }
    } catch (error) {
      console.error("Submit User Error:", error.message || error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  useEffect(() => {
    if (user) {
      setPayload({ ...user });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aung Zaw Phyo</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <Image source={{ uri: payload.profile || 'https://via.placeholder.com/100' }} style={styles.profileImage} />
          <Text style={styles.email}>{payload.email}</Text>
          <Text style={styles.phone}>{payload.phone}</Text>
          <Text style={styles.balance}>150,000,000 Ks</Text>
          <Text style={styles.balanceLabel}>Total Balance (Ks)</Text>
        </View>

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
    padding: 10,
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
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  email: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
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

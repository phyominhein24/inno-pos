import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HomeHeader = ({ navigation }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.title}>Home</Text>
  </View>
);

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#007bff',
      padding: 15,
    },
    title: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
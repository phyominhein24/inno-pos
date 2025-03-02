import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

const CustomerListScreen = ({ navigation }) => {
  const [customers] = useState(
    Array(6)
      .fill({
        name: "Aung Zaw Phyo",
        email: "aungzawphyo1994@gmail.com",
        phone: "09432345324",
      })
      .map((customer, index) => ({ ...customer, id: index.toString() }))
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput style={styles.searchBar} placeholder="Search Customer" />

      {/* Create Button */}
      <View style={styles.createContainer}>
        <Text style={styles.customerListTitle}>CUSTOMER LIST</Text>
        <TouchableOpacity onPress={() => navigation.navigate("UserCreate")}>
          <Text style={styles.createButton}>Create +</Text>
        </TouchableOpacity>
      </View>

      {/* Customer List */}
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.customerItem}
            onPress={() => navigation.navigate("UserUpdate", { data: item })} // Navigate to UserUpdateScreen
          >
            <Ionicons
              name="person-circle-outline"
              size={40}
              color="black"
              style={styles.avatar}
            />
            <View>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text style={styles.customerEmail}>{item.email}</Text>
              <Text style={styles.customerPhone}>{item.phone}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    // paddingHorizontal: 10,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  createContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,

  },
  customerListTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  createButton: {
    fontSize: 14,
    color: "blue",
  },
  customerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,

  },
  avatar: {
    marginRight: 15,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customerEmail: {
    fontSize: 14,
    color: "#666",
  },
  customerPhone: {
    fontSize: 14,
    color: "#666",
  },
});

export default CustomerListScreen;

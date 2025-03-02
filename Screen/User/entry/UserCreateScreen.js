import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { userPayload } from '../userPayload';
import { useDispatch } from 'react-redux';
import { userService } from '../userService';

const UserCreateScreen = ({ navigation }) => {
  const [payload, setPayload] = useState(userPayload.store);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    setPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!payload.name) {
        alert("Name is required!");
        return;
      }

      const response = await userService.store(payload, dispatch);
      console.log("response", response);

      if (response.status === 200) {
        navigation.navigate("UserList");
      }
    } catch (error) {
      console.error("Submit User Error:", error.message || error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Customer</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter customer name"
        value={payload.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone number"
        keyboardType="phone-pad"
        value={payload.phone}
        onChangeText={(text) => handleChange("phone", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter email address (Optional)"
        keyboardType="email-address"
        value={payload.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={payload.address}
        onChangeText={(text) => handleChange("address", text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "CREATE CUSTOMER"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
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
  input: {
    borderWidth: 1,
    borderColor: "#D2A679",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#A87C4F",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UserCreateScreen;

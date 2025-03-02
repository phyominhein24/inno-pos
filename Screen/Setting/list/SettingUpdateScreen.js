import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { settingService } from "../settingService";
import { useDispatch, useSelector } from "react-redux";
import { settingPayload } from "../settingPayload";

const SeetingUpdateScreen = ({ navigation }) => {
  const [payload, setPayload] = useState(settingPayload.update);
  const { setting } = useSelector((state) => state.setting);
  const [shop_name, setShopName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [tax, setTax] = useState();
  const dispatch = useDispatch();

  console.log("setting", setting);
  

  const handleSubmit = async () => {
    try {
      const updatedPayload = {
        ...payload,
        shop_name,
        phone,
        email,
        address,
        tax,
      };

      console.log("updatedPayload",updatedPayload);
      
  
      const response = await settingService.update(dispatch, updatedPayload);
       console.log("response", response);
  
      if (response.status === 200) {
        setPayload(response.data);
        setShopName(response.data.shop_name || "");
        setPhone(response.data.phone || "");
        setEmail(response.data.email || "");
        setAddress(response.data.address || "");
        setTax(response.data.tax || "");
        ToastAndroid.show("Setting updated successfully", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Submit Setting Error:", error.message || error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    }
  };
  

  useEffect(() => {
    if (setting) {
        setPayload({ ...setting });
        setShopName(setting.shop_name || "");
        setPhone(setting.phone || "");
        setEmail(setting.email || "");
        setAddress(setting.address || "");
        setTax(setting.tax || "");
    }
}, [setting]);

  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter shop name"
        value={shop_name}
        onChangeText={setShopName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter email address (Optional)"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter tax"
        value={tax}
        onChangeText={setTax}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    // padding: 10,
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

export default SeetingUpdateScreen;

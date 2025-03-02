import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ToastAndroid,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { settingService } from "../settingService";
import { useDispatch, useSelector } from "react-redux";
import { settingPayload } from "../settingPayload";
import * as FileSystem from "expo-file-system";

const SeetingUpdateScreen = ({ navigation }) => {
  const [payload, setPayload] = useState(settingPayload.update);
  const { setting } = useSelector((state) => state.setting);
  const [shop_name, setShopName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [tax, setTax] = useState();
  const [imageUri, setImageUri] = useState(null); // State for logo image
  const dispatch = useDispatch();

  useEffect(() => {
    if (setting) {
      setPayload({ ...setting });
      setShopName(setting.shop_name || "");
      setPhone(setting.phone || "");
      setEmail(setting.email || "");
      setAddress(setting.address || "");
      setTax(setting.tax || "");
      setImageUri(setting.logo || null);
    }
  }, [setting]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("shop_name", shop_name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("tax", tax);

      if (imageUri) {
        const fileType = imageUri.split(".").pop();
        const fileInfo = await FileSystem.getInfoAsync(imageUri);

        formData.append("logo", {
          uri: imageUri,
          name: `logo.${fileType}`,
          type: fileInfo.mimeType || `image/${fileType}`,
        });
      }

      console.log("Updated Payload:", formData);

      const response = await settingService.update(dispatch, formData);

      console.log("Response:", response);

      if (response.status === 200) {
        ToastAndroid.show("Settings updated successfully", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Submit Setting Error:", error.message || error);
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
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Logo Upload Section */}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Ionicons name="image-outline" size={50} color="gray" />
        )}
      </TouchableOpacity>
      <Text style={styles.imageText}>Tap to upload logo</Text>

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
  imageContainer: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageText: {
    textAlign: "center",
    color: "gray",
    marginBottom: 10,
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

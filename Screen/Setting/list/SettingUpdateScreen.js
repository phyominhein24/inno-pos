import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ToastAndroid,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { settingService } from "../settingService";
import { useDispatch, useSelector } from "react-redux";
import { settingPayload } from "../settingPayload";
import * as FileSystem from "expo-file-system";
import { payloadHandler } from "../../../helpers/handler";

const SettingUpdateScreen = ({ navigation }) => {
  const [payload, setPayload] = useState(settingPayload.update);
  const { setting, paginateParams } = useSelector((state) => state.setting);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();

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

  const submitSetting = async () => {
    try {
      setIsSubmitting(true);
      await settingService.update(dispatch, payload);
      // ToastAndroid.show("Settings updated successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Submit Setting Error:", error.message || error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadingData = useCallback(async () => {
    try {
      setIsLoading(true);
      await settingService.index(dispatch, paginateParams);
    } catch (error) {
      alert("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, paginateParams]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (setting) {
      setPayload({ ...setting });
    }
  }, [setting]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#A87C4F" />
        </View>
      )}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Ionicons name="image-outline" size={50} color="gray" />
        )}
      </TouchableOpacity>
      <Text style={styles.imageText}>Tap to upload logo</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter shop name"
        value={payload?.shop_name}
        onChangeText={(text) => payloadHandler(payload, text, "shop_name", setPayload)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone number"
        keyboardType="phone-pad"
        value={payload?.phone}
        onChangeText={(text) => payloadHandler(payload, text, "phone", setPayload)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter email address (Optional)"
        keyboardType="email-address"
        value={payload?.email}
        onChangeText={(text) => payloadHandler(payload, text, "email", setPayload)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={payload?.address}
        onChangeText={(text) => payloadHandler(payload, text, "address", setPayload)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter tax"
        value={payload?.tax}
        onChangeText={(text) => payloadHandler(payload, text, "tax", setPayload)}
      />

      <TouchableOpacity style={styles.button} onPress={submitSetting} disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Update</Text>
        )}
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
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
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

export default SettingUpdateScreen;

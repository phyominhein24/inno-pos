import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import CheckoutModal from "../component/CheckoutModal";
import Constants from "expo-constants";
const HomeListScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (route.params?.selectedItem) {
      setItems((prevItems) => [...prevItems, route.params.selectedItem]);
    }
  }, [route.params?.selectedItem]);

  const handleBarCodeScanned = async ({ data }) => {
    setScanning(false);
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/s1.wav")
    );
    await sound.playAsync();
    navigation.navigate("SearchItemList", { scannedBarcode: data });
  };

  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Calculate totals
  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const tax = totalAmount * 0.05;
  const payAmount = totalAmount + tax;
  const refundAmount = 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Search & Scanner */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search Item Code" style={styles.searchInput} />
        <TouchableOpacity onPress={() => setScanning(!scanning)}>
          <Icon name="qr-code-scanner" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {scanning && hasPermission && (
        <CameraView
          onBarcodeScanned={scanning ? handleBarCodeScanned : undefined}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "code128", "ean13", "ean8"],
          }}
          style={styles.camera}
        />
      )}

      {/* Item List */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text>
              {item.name} {item.quantity}×{item.price}
            </Text>
            <Text>{(item.quantity * item.price).toFixed(0)}</Text>

            {/* Delete Button */}
            <TouchableOpacity onPress={() => removeItem(index)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <Text>Tax (5%): {tax.toFixed(2)}</Text>
        <Text>Amount: {totalAmount.toFixed(2)}</Text>
        <Text style={styles.highlightedText}>
          Pay Amount: {payAmount.toFixed(2)}
        </Text>
        <Text>Refund Amount: {refundAmount.toFixed(2)}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setCheckoutVisible(true)}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      <CheckoutModal
        visible={checkoutVisible}
        onClose={() => setCheckoutVisible(false)}
        items={items}
      />
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
    elevation: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#fff",
  },
  searchInput: { flex: 1, padding: 5 },
  camera: { flex: 1, height: 400, marginHorizontal: 10 },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  summaryContainer: { padding: 10, marginHorizontal: 10 },
  highlightedText: { fontWeight: "bold", fontSize: 18 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    
  },
  cancelButton: { backgroundColor: "red", padding: 10, borderRadius: 5 },
  confirmButton: { backgroundColor: "green", padding: 10, borderRadius: 5 },
  buttonText: { color: "white", fontWeight: "bold" },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items in the center
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
});

export default HomeListScreen;

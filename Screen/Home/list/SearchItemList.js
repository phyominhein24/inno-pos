import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QuantityModal from "../component/QuantityModal";

const SearchItemList = ({ navigation, route }) => {

  const [items, setItems] = useState([
    { id: "1", name: "Item ABC", price: 10 },
    { id: "2", name: "Item DEF", price: 15 },
    { id: "3", name: "Item XYZ", price: 20 },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [qtyModalVisible, setQtyModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.scannedBarcode) {
      const scannedItem = items.find(
        (item) => item.name.includes(route.params.scannedBarcode)
      );
      if (scannedItem) {
        setSelectedItem(scannedItem);
        setQtyModalVisible(true);
      }
    }
  }, [route.params?.scannedBarcode]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQtyModalVisible(true);
  };

  const handleSubmit = () => {
    navigation.navigate("HomeList", {
      selectedItem: { ...selectedItem, quantity },
    });
    setQtyModalVisible(false);
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ITEM LIST</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Item List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectItem(item)}>
            <View style={styles.listItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemStock}>{item.price} USD</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <QuantityModal visible={qtyModalVisible} onClose={() => setQtyModalVisible(false)} item={selectedItem} onSubmit={handleSubmit} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10 },
  quantityInput: { borderWidth: 1, padding: 5, width: 50, textAlign: "center" },
  submitButton: { backgroundColor: "brown", padding: 10, marginTop: 10 },
});

export default SearchItemList;

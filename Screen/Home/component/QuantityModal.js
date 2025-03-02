import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const QuantityModal = ({ visible, onClose, item, onSubmit }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const increaseQuantity = () => {
    setSelectedQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setSelectedQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.itemName}>{item?.name || "ITEM ABC"}</Text>
              <Text style={styles.categoryText}>
                {item?.category || "Category Name, Category Name,"}
              </Text>
            </View>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={20} color="black" />
            </Pressable>
          </View>

          {/* Stock Info */}
          <View style={styles.stockContainer}>
            <Text style={styles.stockText}>In Stock</Text>
            <Text style={styles.stockCount}>{item?.stock || 3}</Text>
          </View>

          {/* Quantity Input with Up/Down Buttons & Submit Button */}
          <View style={styles.inputRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.arrowButton} onPress={increaseQuantity}>
                <Text style={styles.arrowText}>▲</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                value={String(selectedQuantity)}
                onChangeText={(text) => {
                  const num = parseInt(text, 10);
                  setSelectedQuantity(isNaN(num) ? 1 : num);
                }}
              />
              <TouchableOpacity style={styles.arrowButton} onPress={decreaseQuantity}>
                <Text style={styles.arrowText}>▼</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => onSubmit(selectedQuantity)}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryText: {
    color: "gray",
    fontSize: 12,
  },
  stockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  stockText: {
    fontSize: 18,
  },
  stockCount: {
    fontSize: 22,
    fontWeight: "bold",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 5,
    marginRight: 10,
  },
  arrowButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  arrowText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityInput: {
    width: 40,
    height: 40,
    textAlign: "center",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#8B5E3B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default QuantityModal;

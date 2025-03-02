import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CheckoutModal = ({ visible, onClose, items }) => {
  const [payAmount, setPayAmount] = useState(0);
  const totalQty = items.reduce((sum, item) => sum + parseInt(item.quantity), 0);
  const totalAmount = totalQty * 10;
  const tax = totalAmount * 0.1;
  const total = totalAmount + tax;
  const refund = Math.max(0, payAmount - (totalAmount + tax));

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.cell}>2</Text>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.quantity}</Text>
                <Text style={styles.cell}>${(item.quantity * 10).toFixed(2)}</Text>
              </View>
            )}
          />
          <View style={styles.summaryRow}><Text>Total Qty:</Text><Text>{totalQty}</Text></View>
          <View style={styles.summaryRow}><Text>Total Amount:</Text><Text>${totalAmount.toFixed(2)}</Text></View>
          <View style={styles.summaryRow}><Text>Tax (10%):</Text><Text>${tax.toFixed(2)}</Text></View>
          <View style={styles.summaryRow}><Text>Total:</Text><Text>${total.toFixed(2)}</Text></View>
          <View style={styles.summaryRow}><Text>Pay Amount:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={payAmount.toString()}
              onChangeText={(val) => setPayAmount(parseFloat(val) || 0)}
            />
          </View>
          <View style={styles.summaryRow}><Text>Refund:</Text><Text>${refund.toFixed(2)}</Text></View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Icon name="cancel" size={18} color="white" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.printButton}>
              <Icon name="print" size={18} color="white" />
              <Text style={styles.buttonText}>Print</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "90%", height: "80%", backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" },
  closeButton: { position: "absolute", top: 10, right: 10 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", paddingVertical: 5, borderBottomWidth: 1 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", paddingVertical: 5 },
  cell: { flex: 1, textAlign: "center" },
  input: { borderWidth: 1, padding: 5, width: 80, textAlign: "right" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 20 },
  cancelButton: { flexDirection: "row", alignItems: "center", backgroundColor: "red", padding: 6, borderRadius: 5, flex: 1, marginRight: 10, justifyContent: "center" },
  printButton: { flexDirection: "row", alignItems: "center", backgroundColor: "green", padding: 6, borderRadius: 5, flex: 1, justifyContent: "center" },
  buttonText: { color: "white", marginLeft: 5 },
});

export default CheckoutModal;

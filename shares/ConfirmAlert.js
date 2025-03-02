import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ConfirmAlert = ({ visible, onCancel, onConfirm, item }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Are you sure you want to delete "{item?.name}"?</Text>
        <View style={styles.modalButtons}>
          <Button title="Cancel" onPress={onCancel} />
          <Button title="Delete" color="red" onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 50,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  }
});

export default ConfirmAlert;

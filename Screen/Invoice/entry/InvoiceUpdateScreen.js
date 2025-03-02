import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker'
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from 'react-redux';
import { invoiceService } from '../invoiceService'; 
import { invoicePayload } from '../invoicePayload';  
import { payloadHandler } from '../../../helpers/handler';
import ValidationMessage from '../../../shares/ValidationMessage';

const InvoiceUpdateScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const { invoice } = useSelector(state => state.invoice);
  const [payload, setPayload] = useState(invoicePayload.update);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const submitInvoice = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.update(dispatch, data?.id, payload);
      if(response.status === 200){
        navigation.navigate('InvoiceList')
      }
    }
    catch (error) {
      console.error("Submit Invoice Error:", error.message || error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setPayload({ ...payload, "profile": result.assets[0].uri });
    }
  };

  useEffect(() => {
    if (invoice) {
      setPayload({ ...invoice });
    }
  }, [invoice]);

  const loadingData = useCallback(async () => {
    try {
    setLoading(true);
    await invoiceService.show(dispatch, data?.id);
    setLoading(false);
    } catch (error) {
      console.error("Submit Invoice Error:", error.message || error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }, [dispatch, data?.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (invoice) {
      const updatePayload = { ...invoice }
      setPayload(updatePayload);
    }
  }, [invoice])

  return (
    <View style={{ padding: 20 }}>
     
      {/* Name Input */}
      <View style={styles.row}>
        <Text>Name (Required)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={payload.name}
          onChangeText={(text) => payloadHandler(payload, text, "name", setPayload)}
        />
        <ValidationMessage field={"name"} />
      </View>

      {/* Description Input */}
      <View style={styles.row}>
        <Text>Description (Required)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={payload.description}
          onChangeText={(text) => payloadHandler(payload, text, "description", setPayload)}
        />
        <ValidationMessage field={"description"} />
      </View>
  
      {/* Status Dropdown */}
      <View style={styles.row}>
        <Text>Status</Text>
        <DropDownPicker
          open={showStatusPicker} 
          setOpen={setShowStatusPicker}
          value={payload.status}
          items={[
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Disable', value: 'DISABLE' },
          ]}
          defaultValue={payload.status}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownStyle={styles.dropdownList}
          setValue={(callback) => {
            const newValue = callback(payload.status);
            payloadHandler(payload, newValue, 'status', setPayload);
          }}
        />
        <ValidationMessage field={"status"} />
      </View>

      {/* Submit Button */}
      <View style={{ marginTop: 20 }}>
        <Button mode="contained" onPress={()=>submitInvoice()}>
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InvoiceUpdateScreen;

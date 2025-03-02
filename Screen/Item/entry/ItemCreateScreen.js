import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker'
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from 'react-redux';
import { itemService } from '../itemService'; 
import { itemPayload } from '../itemPayload';  
import { payloadHandler } from '../../../helpers/handler';
import ValidationMessage from '../../../shares/ValidationMessage';
import { formBuilder } from '../../../helpers/formBuilder';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';

const ItemCreateScreen = ({ navigation, route }) => {

  const [payload, setPayload] = useState(itemPayload.store);
  const [loading, setLoading] = useState(true);
  const { categorys } = useSelector((state) => state.category);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const dispatch = useDispatch();

  const submitItem = async () => {
    try {
      setLoading(true);
      const formData = formBuilder(payload, itemPayload.store);
      const response = await itemService.store( formData, dispatch);
      if(response.status === 200){
        navigation.navigate('ItemList')
      }
    }
    catch (error) {
      console.error("Submit Item Error:", error.message || error);
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

  const loadingData = useCallback(async () => {
    setLoading(true);
    await getRequest(`${endpoints.category}`);
    setLoading(false);
  }, []);

  useEffect(() => {
      loadingData();
  }, [loadingData]);

  return (
    <View style={{ padding: 20 }}>

      {/* Profile Image Upload */}
      <View style={styles.row}>
        <TouchableOpacity onPress={handleImagePick}>
          {payload?.photo ? (
            <Image source={{ uri: payload.photo }} style={styles.photo} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text>Select Photo</Text>
            </View>
          )}
        </TouchableOpacity>
        <ValidationMessage field={"photo"} />
      </View>

      {/* Name Input */}
      <View style={styles.row}>
        <Text>Name (Required)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={payload?.name}
          onChangeText={(text) => payloadHandler(payload, text, "name", setPayload)}
        />
        <ValidationMessage field={"name"} />
      </View>

      {/* Description Input */}
      <View style={styles.row}>
        <Text>Description </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={payload?.description}
          onChangeText={(text) => payloadHandler(payload, text, "description", setPayload)}
        />
        <ValidationMessage field={"description"} />
      </View>

      {/* Category Dropdown */}
      <View style={styles.row}>
        <Text>Category</Text>
        <DropDownPicker
          open={showCategoryPicker} 
          setOpen={setShowCategoryPicker}
          value={payload.category_id}
          items={categorys.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
          defaultValue={payload.category_id}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownStyle={styles.dropdownList}
          setValue={(callback) => {
            const newValue = callback(payload.category_id);
            payloadHandler(payload, newValue, 'category_id', setPayload);
          }}
        />
        <ValidationMessage field={"status"} />
      </View>

      {/* SKU Input */}
      <View style={styles.row}>
        <Text>SKU </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter SKU"
          value={payload?.sku}
          onChangeText={(text) => payloadHandler(payload, text, "sku", setPayload)}
        />
        <ValidationMessage field={"sku"} />
      </View>

      {/* Quantity Input */}
      <View style={styles.row}>
        <Text>Quantity </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Quantity"
          value={payload?.qty}
          onChangeText={(text) => payloadHandler(payload, text, "qty", setPayload)}
          keyboardType="numeric" 
        />
        <ValidationMessage field={"qty"} />
      </View>

      {/* Price Input */}
      <View style={styles.row}>
        <Text>Price </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Price"
          value={payload?.price}
          onChangeText={(text) => payloadHandler(payload, text, "price", setPayload)}
          keyboardType="numeric" 
        />
        <ValidationMessage field={"price"} />
      </View>

      {/* Qrcode Input */}
      <View style={styles.row}>
        <Text>QR Code </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter QR Code"
          value={payload?.qrcode}
          onChangeText={(text) => payloadHandler(payload, text, "qrcode", setPayload)}
        />
        <ValidationMessage field={"qrcode"} />
      </View>

      {/* Submit Button */}
      <View style={{ marginTop: 20 }}>
        <Button mode="contained" onPress={()=>submitItem()}>
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

export default ItemCreateScreen;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from 'react-redux';
import { categoryService } from '../categoryService'; 
import { categoryPayload } from '../categoryPayload';  
import { payloadHandler } from '../../../helpers/handler';
import ValidationMessage from '../../../shares/ValidationMessage';
import { formBuilder } from '../../../helpers/formBuilder';

const CategoryCreateScreen = ({ navigation, route }) => {

  const [payload, setPayload] = useState(categoryPayload.store);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const submitCategory = async () => {
    try {
      setLoading(true);
      const formData = formBuilder(payload, categoryPayload.store);
      const response = await categoryService.store( formData, dispatch);
      if(response.status === 200){
        navigation.navigate('CategoryList')
      }
    }
    catch (error) {
      console.error("Submit Category Error:", error.message || error);
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

  return (
    <View style={{ padding: 20 }}>

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
        <Text>Description (Required)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={payload?.description}
          onChangeText={(text) => payloadHandler(payload, text, "description", setPayload)}
        />
        <ValidationMessage field={"description"} />
      </View>

      {/* Submit Button */}
      <View style={{ marginTop: 20 }}>
        <Button mode="contained" onPress={()=>submitCategory()}>
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

export default CategoryCreateScreen;

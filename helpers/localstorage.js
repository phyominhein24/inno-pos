import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key, value) => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
    return value;
  } catch (error) {
    console.error('Error saving data:', error);
  }
};


export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data); 
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};


export const removeAllData = async () => {
  try {
    await AsyncStorage.clear();
    return null;
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};


export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return null;
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

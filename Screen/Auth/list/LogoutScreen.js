import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="blue" />
      <Text style={{ marginTop: 10 }}>Logging out...</Text>
    </View>
  );
};

export default LogoutScreen;

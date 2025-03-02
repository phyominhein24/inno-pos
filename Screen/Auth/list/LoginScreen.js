import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { payloadHandler } from '../../../helpers/handler';
import { authService } from '../authService';
import ValidationMessage from '../../../shares/ValidationMessage';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const submitLogin = async () => {
    navigation.navigate('Dashboard');
    setLoading(true);
    try {
      const result = await authService.login(payload, dispatch);
      setLoading(false);
      if (result?.status === 200) {
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      setLoading(false);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/BeautyMyanmar.png')} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={payload.email}
          onChangeText={(text) =>
            payloadHandler(payload, text, 'email', (updateValue) => {
              setPayload(updateValue);
            })
          }
        />
        <ValidationMessage field="email" style={styles.validationMessage} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
          value={payload.password}
          onChangeText={(text) =>
            payloadHandler(payload, text, 'password', (updateValue) => {
              setPayload(updateValue);
            })
          }
        />
        <ValidationMessage field="password" style={styles.validationMessage} />
      </View>

      <TouchableOpacity style={styles.button} disabled={loading} onPress={submitLogin}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <Text style={styles.footer}>Development By InnoScript Co., Ltd</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#9C7B48',
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  validationMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#9C7B48',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: '#666',
  },
});

export default LoginScreen;